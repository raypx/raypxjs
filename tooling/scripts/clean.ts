import type { ListrTask } from "listr2";
import * as rimraf from "rimraf";
import { createTask, definedCmd } from "./task";
import { PROJECT_ROOT } from "./utils";

/**
 * File patterns to clean during cleanup operations
 */
const CLEAN_PATTERNS = [
  "**/dist", // Build output directories
  "**/.turbo", // Turbo cache directories
  "**/tsconfig.tsbuildinfo", // TypeScript build info files
  "**/.next", // Next.js build output
  "**/coverage", // Test coverage reports
  "**/.vercel", // Vercel deployment cache
  "**/.output", // Build output directories
];

/**
 * Creates a task that runs the monorepo clean command
 */
function createWorkspaceCleanTask(): ListrTask {
  return createTask("pnpm -r --if-present --parallel clean", {
    title: "Monorepo clean",
  });
}

/**
 * Creates a task that cleans files using glob patterns
 */
function createFileCleanTask(): ListrTask {
  return createTask("Cleaning files and directories", async (_, task) => {
    try {
      await rimraf.rimraf(CLEAN_PATTERNS, {
        glob: {
          cwd: PROJECT_ROOT,
        },
      });

      task.title = `Cleaned ${CLEAN_PATTERNS.length} patterns successfully`;
    } catch (error) {
      task.title = "File cleaning failed";
      throw new Error(`File cleaning failed: ${error}`);
    }
  });
}

/**
 * Main clean function
 */
const clean = definedCmd([createFileCleanTask(), createWorkspaceCleanTask()], {
  concurrent: true,
});

export default clean;
