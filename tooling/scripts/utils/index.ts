import { type ExecSyncOptions, execSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Path utilities
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Project root directory (monorepo root) */
export const PROJECT_ROOT = resolve(__dirname, "../../../");

/**
 * Formats duration in milliseconds to human-readable string
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}

/** Default execution options for silent command execution */
export const SILENT_EXEC_OPTIONS: ExecSyncOptions = {
  stdio: ["ignore", "ignore", "inherit"],
  cwd: PROJECT_ROOT,
};

/**
 * Safely executes a shell command with error handling
 */
export function safeExec(command: string, options?: ExecSyncOptions): boolean {
  try {
    execSync(command, {
      encoding: "utf8",
      maxBuffer: 1024 * 1024 * 10,
      ...SILENT_EXEC_OPTIONS,
      ...options,
    });
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Command failed: ${command}`, error);
    }
    return false;
  }
}
