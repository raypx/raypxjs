import type { ExecSyncOptions } from "node:child_process";
import type { ListrTask } from "listr2";
import type { Simplify } from "type-fest";
import { safeExec } from "./utils";

/**
 * Creates a ListrTask - supports both task functions and shell commands
 *
 * @example
 * createTask("Custom Task", async (_, task) => { console.log("done"); })
 * createTask("pnpm build", { title: "Building" })
 * createTask("pnpm test", "Running tests")
 */
type TaskConfig = Simplify<{
  title: string;
  successTitle?: string;
  failureMessage?: string;
  options?: ExecSyncOptions;
}>;

export function createTask(
  titleOrCommand: string,
  taskFnOrOpts?: ListrTask["task"] | TaskConfig | string,
): ListrTask {
  if (typeof taskFnOrOpts === "function") {
    return {
      title: titleOrCommand,
      task: taskFnOrOpts,
    };
  }

  const command = titleOrCommand;
  const config = typeof taskFnOrOpts === "string" ? { title: taskFnOrOpts } : taskFnOrOpts;
  const { title = command, successTitle, failureMessage, options } = config ?? {};

  const autoSuccessTitle = successTitle || `${title} completed`;
  const autoFailureMessage = failureMessage || `${title} failed`;

  return {
    title,
    task: async (_, task) => {
      try {
        const success = safeExec(command, options);

        if (success) {
          task.title = autoSuccessTitle;
        } else {
          task.skip(autoFailureMessage);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        task.skip(`${autoFailureMessage}: ${errorMessage}`);
      }
    },
  };
}

type CmdOptions = Simplify<{
  concurrent?: boolean | number;
  exitOnError?: boolean;
  renderer?: string;
}>;

export type Cmd = Simplify<{
  tasks: ListrTask[];
  options?: CmdOptions;
}>;

/**
 * Creates a Cmd object with tasks and options
 * Supports both task arrays and functions that return task arrays
 * Can automatically parse command line arguments and pass them to tasks
 *
 * @example
 * // Direct task array
 * definedCmd([createTask("build", "Building project")])
 *
 * @example
 * // Function that returns tasks
 * definedCmd(() => [
 *   createTask("build", "Building project"),
 *   createTask("test", "Running tests")
 * ])
 *
 * @example
 * // Function with parsed arguments
 * definedCmd((args) => [
 *   createTask(`Processing ${args[0]}`, async () => { ... })
 * ])
 */
export function definedCmd(
  tasks: Cmd["tasks"] | (() => Cmd["tasks"]) | ((args: string[]) => Cmd["tasks"]),
  options: Cmd["options"] = {},
): Cmd {
  let taskList: Cmd["tasks"];

  if (typeof tasks === "function") {
    // Parse command line arguments (skip node, script, command name)
    const args = process.argv.slice(3);

    // Check if function expects arguments by checking its length
    const taskFunction = tasks as (args?: string[]) => Cmd["tasks"];
    taskList =
      taskFunction.length > 0 ? taskFunction(args) : (taskFunction as () => Cmd["tasks"])();
  } else {
    taskList = tasks;
  }

  return {
    tasks: taskList,
    options,
  };
}
