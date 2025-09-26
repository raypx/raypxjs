/**
 * Email client configuration and types
 */

export type EmailClientOptions = {
  apiUrl?: string;
  token?: string;
  timeout?: number;
};

export type EmailClientResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

export const DEFAULT_EMAIL_CLIENT_OPTIONS: Required<EmailClientOptions> = {
  apiUrl: "/api/email",
  token: "",
  timeout: 10_000,
};
