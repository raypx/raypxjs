import { Listr, PRESET_TIMER } from "listr2";
import { camelCase } from "lodash-es";
import { formatDuration, logger } from "./utils";

// Command cache to avoid repeated dynamic imports
const cmdCache = new Map<string, any>();

// Lazy load commands with caching
async function loadCommand(name: string) {
  if (cmdCache.has(name)) {
    return cmdCache.get(name);
  }

  const cmdMap = {
    clean: () => import("./cmd/clean").then((m) => m.default),
    format: () => import("./cmd/format").then((m) => m.default),
    setup: () => import("./cmd/setup").then((m) => m.default),
    postinstall: () => import("./cmd/postinstall").then((m) => m.default),
    addGitEmoji: () => import("./cmd/add-git-emoji").then((m) => m.default),
  } as const;

  const loader = cmdMap[camelCase(name) as keyof typeof cmdMap];
  if (!loader) {
    return null;
  }

  const cmd = await loader();
  cmdCache.set(name, cmd);
  return cmd;
}

/**
 * CLI entry point for raypx-scripts
 */
async function cli(name: string) {
  const cmd = await loadCommand(name);

  if (!cmd) {
    logger.error(`Command ${name} not found`);
    process.exit(1);
  }

  try {
    const startTime = Date.now();
    const { tasks, options = {} } = cmd;

    const listr = new Listr(tasks, {
      concurrent: options.concurrent ?? true,
      exitOnError: options.exitOnError ?? true,
      renderer: process.env.CI ? "verbose" : "default",
      rendererOptions: {
        timer: PRESET_TIMER,
        clearOutput: false,
        removeEmptyLines: true,
      },
    });

    await listr.run();

    const totalDuration = Date.now() - startTime;
    logger.success(`Tasks completed in ${formatDuration(totalDuration)}`);
  } catch (error: any) {
    logger.error(`Command ${name} failed:`, error.message);
    if (error.stack) {
      logger.debug("Error stack:", error.stack);
    }
    process.exit(1);
  }
}

export default cli;
