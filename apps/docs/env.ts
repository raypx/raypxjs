import { envs as db } from "@raypx/db/envs";
import { createEnv } from "@raypx/shared";

export const env = createEnv({
  extends: [db()],
  runtimeEnv: {},
  server: {},
  client: {},
});
