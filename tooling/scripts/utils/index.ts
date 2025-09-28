import { type ExecSyncOptions, execSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { logger } from "./logger";

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
  if (ms < 1000) {
    return `${ms}ms`;
  }
  if (ms < 60_000) {
    return `${(ms / 1000).toFixed(1)}s`;
  }
  const minutes = Math.floor(ms / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return `${minutes}m ${seconds}s`;
}

/** Default execution options for silent command execution */
export const SILENT_EXEC_OPTIONS: ExecSyncOptions = {
  stdio: ["ignore", "ignore", "inherit"],
  cwd: PROJECT_ROOT,
};

/**
 * Allowed command prefixes for this project
 */
const ALLOWED_COMMANDS = ["pnpm", "node", "tsx", "tsc", "biome", "git", "du"] as const;

/**
 * Additional dangerous patterns to block
 */
const DANGEROUS_PATTERNS = [
  /rm\s+-rf?\s+\//, // rm -rf /
  /sudo/, // sudo commands
  /chmod\s+777/, // dangerous permissions
  /eval\s*\(/, // eval injection
  />\s*\/dev\//, // writing to devices
  /curl.*\|\s*sh/, // pipe to shell
  /wget.*\|\s*sh/, // pipe to shell
  /npm\s+install\s+-g/, // global npm installs
  /yarn/, // yarn commands
  /npx/, // npx commands
] as const;

/**
 * Validates if a command is safe to execute
 */
function validateCommand(command: string): boolean {
  const trimmedCmd = command.trim();
  if (!trimmedCmd) {
    return false;
  }

  // Extract the base command (first word)
  const baseCommand = trimmedCmd.split(/\s+/)[0];
  if (!baseCommand) {
    return false;
  }

  // Check if command is in whitelist
  const isAllowed = ALLOWED_COMMANDS.some(
    (cmd) => baseCommand === cmd || baseCommand.startsWith(`${cmd}/`)
  );

  if (!isAllowed) {
    return false;
  }

  // Check for dangerous patterns
  return !DANGEROUS_PATTERNS.some((pattern) => pattern.test(trimmedCmd));
}

/**
 * Safely executes a shell command with security validation and error handling
 */
export { logger } from "./logger";

export function safeExec(command: string, options?: ExecSyncOptions): boolean {
  // Validate command for security
  if (!validateCommand(command)) {
    logger.error(`Potentially dangerous command blocked: ${command}`);
    return false;
  }

  logger.debug(`Executing: ${command}`);

  try {
    execSync(command, {
      encoding: "utf8",
      maxBuffer: 1024 * 1024 * 10,
      timeout: 180_000, // 3 minutes default
      ...SILENT_EXEC_OPTIONS,
      ...options,
    });
    return true;
  } catch (error) {
    logger.debug(`Command failed: ${command}`, error);
    return false;
  }
}
