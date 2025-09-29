import { db, nanoid, schemas, uuidv7 } from "@raypx/db";
import { getMailer } from "@raypx/email";
import {
  ResetPasswordEmail,
  SendMagicLinkEmail,
  SendVerificationOTPEmail,
  VerifyEmail,
  WelcomeEmail,
} from "@raypx/email/emails";
import { EMAIL_ADDRESSES } from "@raypx/shared";
import { type BetterAuthOptions, type BetterAuthPlugin, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  admin,
  apiKey,
  emailOTP,
  lastLoginMethod,
  magicLink,
  mcp,
  oneTap,
  organization,
  username,
} from "better-auth/plugins";
import { socialProviders } from "./core/lib/providers/shared-providers";
import { envs } from "./envs";
import { authFeatures } from "./features";
import {
  ac,
  admin as adminRole,
  superadmin as superAdminRole,
  user as userRole,
} from "./permissions";

// Build plugins array based on enabled features
const buildServerPlugins = () => {
  const plugins: BetterAuthPlugin[] = [];

  // Always include basic plugins
  plugins.push(
    username(),
    mcp({
      loginPage: "/signin",
    }),
    lastLoginMethod()
  );

  // Add feature-specific plugins
  if (authFeatures.apiKey) {
    plugins.push(apiKey());
  }

  // Magic Link
  if (authFeatures.magicLink) {
    plugins.push(
      magicLink({
        sendMagicLink: async ({ email, token, url }) => {
          const mailer = await getMailer();
          await mailer.sendEmail({
            subject: "Magic Link",
            from: "noreply@raypx.com",
            template: SendMagicLinkEmail({
              username: email,
              url,
              token,
            }),
            to: email,
          });
        },
      })
    );
  }

  // One Tap
  if (authFeatures.oneTap) {
    plugins.push(oneTap());
  }

  // Organization
  if (authFeatures.organization) {
    plugins.push(
      admin({
        defaultRole: "user",
        adminRoles: ["admin", "superadmin"],
        ac,
        roles: {
          user: userRole,
          admin: adminRole,
          superadmin: superAdminRole,
        },
      }),
      organization()
    );
  }

  // Email OTP
  if (authFeatures.emailOTP) {
    plugins.push(
      emailOTP({
        sendVerificationOTP: async (data, _request) => {
          const { email, otp } = data;
          const mailer = await getMailer();
          await mailer.sendEmail({
            to: email,
            from: EMAIL_ADDRESSES.HELLO,
            subject: "Verify your email",
            template: SendVerificationOTPEmail({
              otp,
            }),
          });
        },
      })
    );
  }

  return plugins;
};

const createConfig = (): BetterAuthOptions => {
  const env = envs();

  return {
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      sendResetPassword: async ({ user, url }) => {
        const mailer = await getMailer();
        await mailer.sendEmail({
          to: user.email,
          subject: "Reset your password",
          from: EMAIL_ADDRESSES.HELLO,
          template: ResetPasswordEmail({
            resetLink: url,
            username: user.name || user.email,
          }),
        });
      },
    },
    emailVerification: {
      sendVerificationEmail: async ({ url, user }) => {
        const mailer = await getMailer();
        await mailer.sendEmail({
          subject: "Verify your email",
          from: EMAIL_ADDRESSES.HELLO,
          template: VerifyEmail({
            url,
            username: user.email,
          }),
          to: user.email,
        });
      },
    },
    baseURL: env.NEXT_PUBLIC_AUTH_URL,
    socialProviders,
    trustedOrigins: (req) =>
      [req.headers.get("origin") ?? "", req.headers.get("referer") ?? ""].filter(
        Boolean
      ) as string[],
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // 5 minutes
      },
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day
    },
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: schemas,
    }),
    advanced: {
      database: {
        generateId: () => uuidv7(),
      },
      crossSubDomainCookies: {
        enabled: !!env.AUTH_DOMAIN,
        domain: env.AUTH_DOMAIN,
      },
      cookiePrefix: "auth",
    },
    user: {
      deleteUser: {
        enabled: true,
      },
    },
    databaseHooks: {
      user: {
        create: {
          before: (user) => {
            const name = user.name?.trim() || user.email?.split("@")[0] || nanoid();
            const image = user.image || `https://ui-avatars.com/api/?name=${name}`;

            return Promise.resolve({
              data: {
                name,
                image,
              },
            });
          },
          after: async (user) => {
            const mailer = await getMailer();
            await mailer.sendEmail({
              subject: "Welcome to Raypx",
              from: EMAIL_ADDRESSES.HELLO,
              template: WelcomeEmail({
                username: user.name || user.email,
              }),
              to: user.email,
            });
          },
        },
      },
    },
    logger: {
      disabled: false,
      level: "debug",
    },
    plugins: buildServerPlugins(),
  };
};

const config: BetterAuthOptions = createConfig();

export const auth = betterAuth(config);

export type Auth = typeof auth;
