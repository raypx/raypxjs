import { render } from "@react-email/render";
import type { ReactElement } from "react";
import type { z } from "zod";
import type { MailerSchema } from "../types";

export abstract class Mailer<Res = unknown> {
  abstract sendEmail(data: z.infer<typeof MailerSchema>): Promise<Res>;

  async render(template: ReactElement | string): Promise<string> {
    if (typeof template === "string") {
      return template;
    }
    return await render(template);
  }
}
