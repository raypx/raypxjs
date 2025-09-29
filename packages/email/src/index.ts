import z from "zod";

const MAILER_PROVIDERS = [
  "nodemailer",
  "resend",
  // add more providers here
] as const satisfies readonly EmailProvider[];

const MAILER_PROVIDER = z
  .enum(MAILER_PROVIDERS)
  .default("nodemailer")
  .parse(process.env.MAILER_PROVIDER);

import { mailerRegistry } from "./registry";
import type { EmailProvider } from "./types";

/**
 * @name getMailer
 * @description Get the mailer based on the environment variable using the registry internally.
 */
export function getMailer() {
  return mailerRegistry.get(MAILER_PROVIDER);
}

export { MAILER_PROVIDER };
