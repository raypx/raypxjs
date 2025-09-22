import chalk from "chalk";
import { Listr, PRESET_TIMER } from "listr2";
import type { Cmd } from "./task";
import { formatDuration } from "./utils";

/**
 * CLI entry point for raypx-scripts
 */
async function cli(name: string) {
  const cmd: Cmd = await import(`./${name}.ts`).then((m) => m.default);

  if (!cmd) {
    console.error(`raypx-scripts ${name} not found`);
    process.exit(1);
  }

  try {
    const startTime = Date.now();
    const { tasks, options = {} } = cmd;

    const listr = new Listr(tasks, {
      concurrent: options.concurrent ?? false,
      exitOnError: options.exitOnError ?? false,
      renderer: (options.renderer as any) ?? "default",
      rendererOptions: {
        timer: {
          ...PRESET_TIMER,
          format: (...args: number[]) => {
            return () => chalk.gray(`[${formatDuration(args[0] ?? 0)}]`);
          },
        },
        persistentOutput: true,
      },
    });

    await listr.run();
    console.log(`\nTasks completed in ${formatDuration(Date.now() - startTime)}`);
  } catch (error: any) {
    console.error(`raypx-scripts ${name} error:`, error.message);
    if (error.stack) {
      console.error("Error stack:", error.stack);
    }
    process.exit(1);
  }
}

export default cli;
