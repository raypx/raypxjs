import { createEnv, z } from "@raypx/shared";

export const envs = () =>
  createEnv({
    server: {
      DATABASE_URL: z.string().min(1),
      DATABASE_PREFIX: z.string().min(1).optional(),
      DATABASE_PROVIDER: z.enum(["postgres", "neon"]).default("postgres"),
    },
    runtimeEnv: {
      DATABASE_URL: process.env.DATABASE_URL,
      DATABASE_PREFIX: process.env.DATABASE_PREFIX,
      DATABASE_PROVIDER: process.env.DATABASE_PROVIDER,
    },
  });
