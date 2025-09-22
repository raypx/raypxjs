import { join } from "node:path";
import deepmerge from "deepmerge";
import fs from "fs-extra";
import type { ListrTaskWrapper } from "listr2";
import { createTask, definedCmd } from "../lib/task";

/**
 * Claude Code configuration constants
 */
const CLAUDE_DIR = ".claude";
const SETTINGS_FILE = "settings.json";
const LOCAL_SETTINGS_FILE = "settings.local.json";

/**
 * Merge options for combining settings arrays
 */
const mergeOptions = {
  arrayMerge: (target: unknown[], source: unknown[]) => [...new Set([...target, ...source])],
};

/**
 * Sets up Claude Code configuration
 */
async function setupClaudeCode(task: ListrTaskWrapper<any, any, any>): Promise<void> {
  const settingsPath = join(CLAUDE_DIR, SETTINGS_FILE);
  const localSettingsPath = join(CLAUDE_DIR, LOCAL_SETTINGS_FILE);

  try {
    // Check if base settings template exists
    if (!(await fs.pathExists(settingsPath))) {
      task.skip("No Claude settings template found");
      return;
    }

    const baseSettings = await fs.readJson(settingsPath);

    // Validate base settings structure
    if (!baseSettings || typeof baseSettings !== "object") {
      task.skip("Invalid base settings format");
      return;
    }

    if (!(await fs.pathExists(localSettingsPath))) {
      // Create local settings from base template
      await fs.ensureDir(CLAUDE_DIR);
      await fs.writeJson(localSettingsPath, baseSettings, { spaces: 2 });
      task.title = "Created local settings file";
    } else {
      const localSettings = await fs.readJson(localSettingsPath);

      // Validate local settings structure
      if (!localSettings || typeof localSettings !== "object") {
        task.skip("Invalid local settings format, recreating...");
        await fs.writeJson(localSettingsPath, baseSettings, { spaces: 2 });
        task.title = "Recreated local settings file";
        return;
      }

      // Merge base and local settings
      const merged = deepmerge(baseSettings, localSettings, mergeOptions);
      await fs.writeJson(localSettingsPath, merged, { spaces: 2 });
      task.title = "Merged settings with local configuration";
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    task.skip(`Failed to setup Claude code: ${errorMessage}`);
  }
}

/**
 * Post-install tasks
 */
const postinstall = definedCmd([
  createTask("biome migrate --write", "Biome migration"),
  createTask("pnpm --filter docs run fumadocs-mdx", "Fumadocs MDX"),
  createTask("Claude Code setup", async (_, task) => {
    await setupClaudeCode(task);
  }),
]);

export default postinstall;
