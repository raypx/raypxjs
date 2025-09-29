import "server-only";

import { z } from "zod";
import type { MailerSchema } from "../types";
import { Mailer } from "./base";

export const SmtpConfigSchema = z.object({
  user: z
    .string()
    .describe(
      "This is the email account to send emails from. This is specific to the email provider."
    ),
  pass: z.string().describe("This is the password for the email account"),
  host: z.string().describe("This is the SMTP host for the email provider"),
  port: z.number().describe("This is the port for the email provider. Normally 587 or 465."),
  secure: z.boolean().describe("This is whether the connection is secure or not"),
});

function getSMTPConfiguration() {
  const data = SmtpConfigSchema.parse({
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_TLS !== "false",
  });

  return {
    host: data.host,
    port: data.port,
    secure: data.secure,
    auth: {
      user: data.user,
      pass: data.pass,
    },
  };
}

type Config = z.infer<typeof MailerSchema>;

export function createNodemailerService() {
  return new Nodemailer();
}

/**
 * A class representing a mailer using Nodemailer library.
 * @implements {Mailer}
 */
class Nodemailer extends Mailer {
  async sendEmail(config: Config) {
    const { createTransport } = await import("nodemailer");
    const transporter = createTransport(getSMTPConfiguration());
    const html = await this.render(config.template);

    return transporter.sendMail({
      ...config,
      html,
    });
  }
}
