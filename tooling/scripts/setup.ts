import { createTask, definedCmd } from "./task";

/**
 * Setup function for initial project configuration
 */
const setup = definedCmd([
  createTask("pnpm --filter @raypx/db run db:migrate", {
    title: "Database migration",
  }),
]);

export default setup;
