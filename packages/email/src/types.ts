import { isValidElement, type ReactElement } from "react";
import { z } from "zod";

export const MailerSchema = z.object({
  to: z.email(),
  from: z.string().min(1),
  subject: z.string(),
  template: z.union([z.string(), z.custom<ReactElement>((val) => isValidElement(val))]),
});

// Core types - simple and direct
export type EmailStatus =
  | "queued"
  | "sent"
  | "delivered"
  | "opened"
  | "clicked"
  | "bounced"
  | "complained"
  | "unsubscribed"
  | "failed"
  | "delivery_delayed";

export type EmailProvider = "resend" | "nodemailer";
export type EmailEventType = Exclude<EmailStatus, "queued" | "failed">;
export type ResendWebhookEventType = `email.${Exclude<EmailEventType, "unsubscribed">}`;

// Simple enum constants - no over-engineering
export const EmailStatus = {
  QUEUED: "queued",
  SENT: "sent",
  DELIVERED: "delivered",
  OPENED: "opened",
  CLICKED: "clicked",
  BOUNCED: "bounced",
  COMPLAINED: "complained",
  UNSUBSCRIBED: "unsubscribed",
  FAILED: "failed",
  DELIVERY_DELAYED: "delivery_delayed",
} as const;

export const EmailProvider = {
  RESEND: "resend",
  NODEMAILER: "nodemailer",
} as const;

export const EmailEventType = {
  SENT: "sent",
  DELIVERED: "delivered",
  OPENED: "opened",
  CLICKED: "clicked",
  BOUNCED: "bounced",
  COMPLAINED: "complained",
  UNSUBSCRIBED: "unsubscribed",
  DELIVERY_DELAYED: "delivery_delayed",
} as const;

export const ResendWebhookEventType = {
  EMAIL_SENT: "email.sent",
  EMAIL_DELIVERED: "email.delivered",
  EMAIL_DELIVERY_DELAYED: "email.delivery_delayed",
  EMAIL_COMPLAINED: "email.complained",
  EMAIL_BOUNCED: "email.bounced",
  EMAIL_OPENED: "email.opened",
  EMAIL_CLICKED: "email.clicked",
} as const;

// Type-safe arrays
export const EMAIL_STATUSES = Object.values(EmailStatus);
export const EMAIL_PROVIDERS = Object.values(EmailProvider);
export const EMAIL_EVENT_TYPES = Object.values(EmailEventType);
export const RESEND_WEBHOOK_EVENT_TYPES = Object.values(ResendWebhookEventType);

// Base types with better composition
type BaseEmailData = {
  id: string;
  subject: string;
  toAddress: string;
  createdAt: Date;
};

type BaseEmailStats = {
  total: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  complained: number;
  unsubscribed: number;
  failed: number;
};

// Enhanced stats with calculated rates
type EmailRates = {
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  complaintRate: number;
  unsubscribeRate: number;
};

// Main types using composition
export type EmailDeliveryStats = BaseEmailStats & EmailRates;

// Email data with status information
export type EmailDataWithStatus = BaseEmailData & {
  status: EmailStatus;
  openedAt?: Date;
  deliveredAt?: Date;
  bouncedAt?: Date;
  updatedAt?: Date;
};

// Email sending configuration
export type SendEmailOptions = {
  to: string | string[];
  subject: string;
  template: ReactElement;
  provider?: EmailProvider;
  templateName?: string;
  userId?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
  trackingEnabled?: boolean;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  fromAddress?: string;
  html?: string;
  text?: string;
  priority?: "low" | "normal" | "high";
  scheduledAt?: Date;
};

// Email sending result with better error handling
export type SendEmailSuccess = {
  success: true;
  emailId: string;
  providerId?: string;
  messageId: string;
};

export type SendEmailFailure = {
  success: false;
  error: string;
  errorCode?: string;
  retryable?: boolean;
  emailId?: string;
  providerError?: string;
  timestamp: Date;
};

export type SendEmailResult = SendEmailSuccess | SendEmailFailure;

// Analytics filtering with better type safety
export type EmailAnalyticsFilter = {
  startDate?: Date;
  endDate?: Date;
  provider?: EmailProvider;
  templateName?: string;
  userId?: string;
  tags?: string[];
  status?: EmailStatus[];
};

// Location information
type LocationData = {
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
};

// Email event data with stricter typing
export type EmailEventData = {
  emailId: string;
  eventType: EmailEventType;
  timestamp: Date;
  userAgent?: string;
  ipAddress?: string;
  location?: LocationData;
  clickedUrl?: string;
  providerEventId?: string;
  providerData?: Record<string, unknown>;
  deviceType?: "desktop" | "mobile" | "tablet" | "unknown";
  browser?: string;
  os?: string;
};

// Base webhook event
export type WebhookEvent = {
  type: string;
  data: Record<string, unknown>;
  timestamp: string;
  signature?: string;
  id?: string;
};

// Resend webhook specific data
type ResendWebhookData = {
  email_id: string;
  from: string;
  to: string[];
  subject: string;
  created_at: string;
  clicked_link?: { url: string };
  user_agent?: string;
  ip?: string;
  bounce_type?: "hard" | "soft";
  bounce_reason?: string;
};

export type ResendWebhookEvent = WebhookEvent & {
  type: ResendWebhookEventType;
  data: ResendWebhookData;
};

// Template performance data
type TemplatePerformance = {
  templateName: string;
  count: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
};

// Hourly statistics
type HourlyStats = {
  hour: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
};

// Dashboard data with better structure
export type EmailDashboardData = {
  stats: EmailDeliveryStats;
  recentEmails: EmailDataWithStatus[];
  topTemplates: TemplatePerformance[];
  hourlyStats: HourlyStats[];
  period: {
    start: Date;
    end: Date;
  };
};

// Security details for templates
type SecurityDetails = {
  type: string;
  description: string;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  severity?: "low" | "medium" | "high" | "critical";
};

// Email template props with better organization
export type EmailTemplateProps = {
  username?: string;
  email?: string;
  actionUrl?: string;
  otp?: string;
  organizationName?: string;
  inviterName?: string;
  apiKeyName?: string;
  securityDetails?: SecurityDetails;
  unsubscribeUrl?: string;
  supportEmail?: string;
  companyName?: string;
  logoUrl?: string;
};

// Validation utilities
export const isValidEmailStatus = (value: unknown): value is EmailStatus =>
  typeof value === "string" && EMAIL_STATUSES.includes(value as EmailStatus);

export const isValidEmailProvider = (value: unknown): value is EmailProvider =>
  typeof value === "string" && EMAIL_PROVIDERS.includes(value as EmailProvider);

export const isValidEmailEventType = (value: unknown): value is EmailEventType =>
  typeof value === "string" && EMAIL_EVENT_TYPES.includes(value as EmailEventType);

export const isValidResendWebhookEventType = (value: unknown): value is ResendWebhookEventType =>
  typeof value === "string" && RESEND_WEBHOOK_EVENT_TYPES.includes(value as ResendWebhookEventType);

export const isValidEmail = (email: unknown): email is string =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;

export const isValidEmailArray = (emails: unknown): emails is string[] =>
  Array.isArray(emails) && emails.every(isValidEmail);

// Dynamic display name generation (no hardcoded mappings)
function toDisplayName(value: string): string {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getEmailStatusDisplayName(status: EmailStatus): string {
  return toDisplayName(status);
}

export function getEmailProviderDisplayName(provider: EmailProvider): string {
  return toDisplayName(provider);
}

export function getEmailEventTypeDisplayName(eventType: EmailEventType): string {
  return toDisplayName(eventType);
}

// Utility functions for working with email data
export function isEmailDelivered(status: EmailStatus): boolean {
  return status === "delivered";
}

export function isEmailOpened(status: EmailStatus): boolean {
  return status === "opened";
}

export function isEmailClicked(status: EmailStatus): boolean {
  return status === "clicked";
}

export function isEmailBounced(status: EmailStatus): boolean {
  return status === "bounced";
}

export function isEmailFailed(status: EmailStatus): boolean {
  return status === "failed";
}

// Calculate rates from stats
export function calculateEmailRates(stats: BaseEmailStats): EmailRates {
  const { sent, delivered, opened, clicked, bounced, complained, unsubscribed } = stats;

  return {
    deliveryRate: sent > 0 ? delivered / sent : 0,
    openRate: delivered > 0 ? opened / delivered : 0,
    clickRate: opened > 0 ? clicked / opened : 0,
    bounceRate: sent > 0 ? bounced / sent : 0,
    complaintRate: delivered > 0 ? complained / delivered : 0,
    unsubscribeRate: delivered > 0 ? unsubscribed / delivered : 0,
  };
}
