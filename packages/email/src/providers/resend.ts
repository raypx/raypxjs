import "server-only";

import { Resend } from "resend";
import { z } from "zod";
import type { MailerSchema } from "../types";
import { Mailer } from "./base";

type Config = z.infer<typeof MailerSchema>;

const RESEND_API_KEY = z
  .string()
  .describe("The API key for the Resend API")
  .parse(process.env.RESEND_API_KEY);

export function createResendMailer() {
  return new ResendMailer();
}

/**
 * A class representing a mailer using the Resend HTTP API.
 * @implements {Mailer}
 */
class ResendMailer extends Mailer {
  async sendEmail(config: Config) {
    const html = await this.render(config.template);
    const resend = new Resend(RESEND_API_KEY);
    const result = await resend.emails.send({
      from: config.from,
      to: config.to,
      subject: config.subject,
      html,
    });
    if (result.error) {
      throw new Error(result.error.message);
    }
  }
}
