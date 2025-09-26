// Google Analytics types
export type GtagConfig = {
  page_path?: string;
  page_title?: string;
  user_id?: string;
  custom_map?: Record<string, string>;
  [key: string]: unknown;
};

export type GtagEventParams = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: unknown;
};

export type Gtag = {
  (command: "config", targetId: string, config?: GtagConfig): void;
  (command: "event", eventName: string, eventParams?: GtagEventParams): void;
  (command: string, ...args: unknown[]): void;
};

// PostHog types
export type PostHogConfig = {
  api_host?: string;
  ui_host?: string;
  autocapture?: boolean;
  capture_pageview?: boolean;
  disable_session_recording?: boolean;
  [key: string]: unknown;
};

export type PostHogInstance = {
  init(apiKey: string, config?: PostHogConfig): void;
  capture(eventName: string, properties?: Record<string, unknown>): void;
  identify(userId: string, properties?: Record<string, unknown>): void;
  reset(): void;
  setPersonProperties(properties: Record<string, unknown>): void;
  group(groupType: string, groupKey: string, properties?: Record<string, unknown>): void;
  __loaded?: boolean;
};

export type PostHogReactHook = () => PostHogInstance | undefined;

export type PostHogProviderProps = {
  children: React.ReactNode;
  client?: PostHogInstance;
};

export type PostHogProvider = (props: PostHogProviderProps) => React.ReactElement | null;

declare global {
  var gtag: (...args: any[]) => Gtag | Promise<Gtag>;
  var posthog: PostHogInstance | null;
}

// Analytics tracking types
export type TrackEventParams = {
  event: string;
  properties?: Record<string, unknown>;
};

export type IdentifyParams = {
  userId: string;
  properties?: Record<string, unknown>;
};

export type PageViewParams = {
  url?: string;
  title?: string;
};

export type GroupParams = {
  groupType: string;
  groupKey: string;
  properties?: Record<string, unknown>;
};
