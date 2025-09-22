import type { ListrTask } from "listr2";
import { createTask, definedCmd } from "./task";
import { safeExec } from "./utils";

/**
 * Creates a task that formats code using Biome
 */
function createFormatTask(): ListrTask {
  return createTask("Code formatting", (_, task) => {
    const success = safeExec("pnpm exec biome check --write");

    if (success) {
      task.title = "Formatted code with Biome";
    } else {
      task.title = "Code formatting failed";
      throw new Error("Biome formatting failed");
    }
  });
}

/**
 * Main format function
 */
const format = definedCmd([createFormatTask()]);

export default format;
