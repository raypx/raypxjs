import { createRegistry } from "@raypx/shared/registry";
import type { Mailer } from "./providers/base";
import type { EmailProvider } from "./types";

const mailerRegistry = createRegistry<Mailer, EmailProvider>();

mailerRegistry.register("nodemailer", async () => {
  const { createNodemailerService } = await import("./providers/nodemailer");

  return createNodemailerService();
});

mailerRegistry.register("resend", async () => {
  const { createResendMailer } = await import("./providers/resend");

  return createResendMailer();
});

export { mailerRegistry };
