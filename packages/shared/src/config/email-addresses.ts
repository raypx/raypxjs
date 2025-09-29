/**
 * Email addresses configuration
 * Centralized management of all email addresses used across the application
 */

const EMAIL_DOMAIN = process.env.EMAIL_DOMAIN || "raypx.com";

export const EMAIL_ADDRESSES = {
  NOREPLY: process.env.NOREPLY_EMAIL || `noreply@${EMAIL_DOMAIN}`,
  HELLO: process.env.HELLO_EMAIL || `hello@${EMAIL_DOMAIN}`,
  SUPPORT: process.env.SUPPORT_EMAIL || `support@${EMAIL_DOMAIN}`,
  TEST: process.env.TEST_EMAIL || `test@${EMAIL_DOMAIN}`,
} as const;

export const EMAIL_TEMPLATES = {
  DEFAULT_FROM: process.env.RESEND_FROM || `Raypx <${EMAIL_ADDRESSES.HELLO}>`,
  SUPPORT_FROM: `Raypx Support <${EMAIL_ADDRESSES.SUPPORT}>`,
  NOREPLY_FROM: `Raypx <${EMAIL_ADDRESSES.NOREPLY}>`,
} as const;

export const MESSAGE_ID_DOMAIN = process.env.MESSAGE_ID_DOMAIN || EMAIL_DOMAIN;

export type EmailAddress = (typeof EMAIL_ADDRESSES)[keyof typeof EMAIL_ADDRESSES];
export type EmailTemplate = (typeof EMAIL_TEMPLATES)[keyof typeof EMAIL_TEMPLATES];
