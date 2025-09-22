import { createTask, definedCmd } from "../lib/task";

/**
 * Setup function for initial project configuration
 * Optimized: Use concurrent execution for better performance
 */
const setup = definedCmd(
  [
    createTask("pnpm --filter @raypx/db run db:migrate", {
      title: "Database migration",
    }),
  ],
  {
    concurrent: true, // Enable concurrent execution
    exitOnError: true, // Exit immediately on error
  },
);

export default setup;
