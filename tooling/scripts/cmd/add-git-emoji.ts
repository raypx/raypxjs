import { readFileSync, writeFileSync } from "node:fs";
import { createTask, definedCmd } from "../lib/task";

const GIT_EMOJI_MAP = {
  feat: "✨",
  fix: "🐛",
  docs: "📝",
  style: "🎨",
  refactor: "♻️",
  perf: "⚡",
  test: "✅",
  build: "👷",
  ci: "💚",
  chore: "🔧",
  revert: "⏪",
  wip: "🚧",
} as const;

type GitEmojiMap = keyof typeof GIT_EMOJI_MAP;

const EMOJI_REGEX = new RegExp(`^(${Object.values(GIT_EMOJI_MAP).join("|")}|\\s)+`, "g");
const TYPE_REGEX = /^(\w+)(\(.+\))?:/;

const extractType = (msg: string) => msg.replace(EMOJI_REGEX, "").match(TYPE_REGEX)?.[1] ?? "feat";

const processFile = (file: string) => {
  const msg = readFileSync(file, "utf8").trim();
  const clean = msg.replace(EMOJI_REGEX, "");
  const type = extractType(clean);
  const emoji = GIT_EMOJI_MAP[type as GitEmojiMap] ?? GIT_EMOJI_MAP.feat;

  writeFileSync(file, `${emoji} ${clean}`);
  return { emoji, type };
};

export default definedCmd(
  ([file]) => [
    createTask("Adding gitmoji to commit message", (_, task) => {
      if (!file) throw new Error("Commit message file path is required");

      const { emoji, type } = processFile(file);
      task.title = `Added gitmoji ${emoji} for type "${type}"`;
    }),
  ],
  { exitOnError: true },
);
