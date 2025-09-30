export { alias } from "drizzle-orm/pg-core";
export * from "drizzle-orm/sql";

import { envs } from "./envs";
import { databaseRegistry } from "./registry";
import * as schemas from "./schemas";

export * from "./types";
export * from "./utils";

const env = envs();

/**
 * Database client type from Drizzle
 */
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export type Database = PostgresJsDatabase<typeof schemas>;

/**
 * Get database client instance lazily
 * Uses registry to select provider based on DATABASE_PROVIDER env var
 */
let _cachedDb: Database | null = null;

export const getDatabase = async (): Promise<Database> => {
  if (!_cachedDb) {
    _cachedDb = (await databaseRegistry.get(env.DATABASE_PROVIDER)) as Database;
  }
  return _cachedDb;
};

/**
 * Synchronous database client instance
 * Initialized on first module import using top-level await
 *
 * @example
 * ```ts
 * import { db } from "@raypx/db";
 *
 * // Direct usage (provider selected based on DATABASE_PROVIDER env)
 * await db.select().from(users);
 * ```
 */
export const db = await getDatabase();

export { schemas, databaseRegistry };
export type {
  AnyColumn,
  SQL,
} from "drizzle-orm";
export type {
  PgColumn,
  PgTable,
  PgTableWithColumns,
  TableConfig,
  TableLikeHasEmptySelection,
} from "drizzle-orm/pg-core";
// Export query functions after db is initialized
export * from "./query";
