import { createRegistry } from "@raypx/shared/registry";
import type { DatabaseProvider } from "./types";

// Use any to support multiple database drivers (postgres, neon)
// The actual type is enforced at usage site via Database type
const databaseRegistry = createRegistry<any, DatabaseProvider>();

databaseRegistry.register("postgres", async () => {
  const { createClient } = await import("./adapters/postgres");
  const { envs } = await import("./envs");
  const schemas = await import("./schemas");

  const env = envs();

  return createClient({
    databaseUrl: env.DATABASE_URL,
    schema: schemas,
  });
});

databaseRegistry.register("neon", async () => {
  const { createClient } = await import("./adapters/neon");
  const { envs } = await import("./envs");
  const schemas = await import("./schemas");

  const env = envs();

  return createClient({
    databaseUrl: env.DATABASE_URL,
    schema: schemas,
  });
});

export { databaseRegistry };
