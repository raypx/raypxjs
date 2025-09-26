import type { RedisClientType } from "redis";

// ============================================================================
// Core Types
// ============================================================================

export type Promiseable<T> = T | Promise<T>;

export type CacheClosure<T> = () => Promiseable<T>;

export type CacheKey = string | (string | number)[];

export type CacheValue = string | number | boolean | null | undefined | object | unknown[];

export type CacheExpiration = number | null;

export type CacheTags = string[];

// ============================================================================
// Cache Options
// ============================================================================

export type CacheOptions = {
  prefix?: string;
  ttl?: number;
};

// ============================================================================
// Cache Store Interface
// ============================================================================

export type CacheStore = {
  // Basic Operations
  get<T = CacheValue>(key: CacheKey, defaultValue?: T): Promise<T | null>;
  put(key: CacheKey, value: CacheValue, ttl?: CacheExpiration): Promise<boolean>;
  add(key: CacheKey, value: CacheValue, ttl?: CacheExpiration): Promise<boolean>;
  has(key: CacheKey): Promise<boolean>;
  missing(key: CacheKey): Promise<boolean>;
  delete(key: CacheKey): Promise<boolean>;
  flush(): Promise<boolean>;

  // Advanced Operations
  remember<T = CacheValue>(
    key: CacheKey,
    ttl: CacheExpiration,
    closure: CacheClosure<T>
  ): Promise<T>;
  rememberForever<T = CacheValue>(key: CacheKey, closure: CacheClosure<T>): Promise<T>;
  pull<T = CacheValue>(key: CacheKey): Promise<T | null>;

  // Increment/Decrement
  increment(key: CacheKey, value?: number): Promise<number>;
  decrement(key: CacheKey, value?: number): Promise<number>;

  // Multiple Operations
  many(keys: CacheKey[]): Promise<Record<string, CacheValue | null>>;
  putMany(values: Record<string, CacheValue>, ttl?: CacheExpiration): Promise<boolean>;
  deleteMultiple(keys: CacheKey[]): Promise<boolean>;

  // Utility Methods
  tags(names: CacheTags): TaggedCacheStore;
  getPrefix(): string;
  setPrefix(prefix: string): void;
  getTtl(key: CacheKey): Promise<number | null>;

  // Connection Management
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
};

export type TaggedCacheStore = {
  getTags(): CacheTags;
};

// ============================================================================
// Cache Statistics
// ============================================================================

export type CacheStats = {
  hits: number;
  misses: number;
  hitRate: number;
  totalKeys: number;
  memoryUsage: number;
};

// ============================================================================
// Redis Specific Types
// ============================================================================

export interface RedisCacheStore extends CacheStore {
  getRedis(): RedisClientType;
  getConnectionInfo(): RedisConnectionInfo;
  executeCommand<T>(command: string, ...args: unknown[]): Promise<T>;
}

export type RedisConnectionInfo = {
  host: string;
  port: number;
  db: number;
  status: "connected" | "disconnected" | "connecting" | "error";
  lastError?: Error;
};

// ============================================================================
// Cache Events
// ============================================================================

export type CacheEventType = "hit" | "miss" | "set" | "delete" | "flush" | "error";

export type CacheEvent<T = CacheValue> = {
  type: CacheEventType;
  key: CacheKey;
  timestamp: number;
  data?: T;
  error?: Error;
  metadata?: Record<string, unknown>;
};

export type CacheEventListener<T = CacheValue> = (event: CacheEvent<T>) => void;

// ============================================================================
// Error Types
// ============================================================================

export class CacheError extends Error {
  key?: CacheKey;
  operation?: string;
  constructor(message: string, key?: CacheKey, operation?: string) {
    super(message);
    this.name = "CacheError";
    this.key = key;
    this.operation = operation;
  }
}

export class CacheConnectionError extends CacheError {
  connection: string;
  constructor(message: string, connection: string) {
    super(message);
    this.name = "CacheConnectionError";
    this.connection = connection;
  }
}

export class CacheSerializationError extends CacheError {
  value: unknown;
  constructor(message: string, value: unknown) {
    super(message);
    this.name = "CacheSerializationError";
    this.value = value;
  }
}
