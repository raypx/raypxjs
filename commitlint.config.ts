import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["gitmoji"],
  rules: {
    "body-max-line-length": [0, "always", Number.POSITIVE_INFINITY],
    "header-max-length": [0, "always", Number.POSITIVE_INFINITY],
    // Restrict to our simplified 12 commit types only
    "type-enum": [
      2,
      "always",
      [
        "feat", // ✨ - Introduce new features
        "fix", // 🐛 - Fix bugs
        "docs", // 📝 - Add or update documentation
        "style", // 🎨 - Improve structure/format of code
        "refactor", // ♻️ - Refactor code
        "perf", // ⚡ - Improve performance
        "test", // ✅ - Add or update tests
        "build", // 👷 - Add or update build scripts
        "ci", // 💚 - Fix CI build
        "chore", // 🔧 - Add or update configuration files
        "revert", // ⏪ - Revert changes
        "wip", // 🚧 - Work in progress
      ],
    ],
  },
};

export default config;
