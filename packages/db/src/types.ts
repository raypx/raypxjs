import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

/**
 * Supported database providers
 */
export type DatabaseProvider = "postgres" | "neon";

/**
 * Database client configuration
 */
export type DatabaseConfig<TSchema extends Record<string, unknown>> = {
  databaseUrl: string;
  schema: TSchema;
};

/**
 * Database client type - union of all supported database clients
 */
export type DatabaseClient<TSchema extends Record<string, unknown> = Record<string, unknown>> =
  | PostgresJsDatabase<TSchema>
  | NeonHttpDatabase<TSchema>;
