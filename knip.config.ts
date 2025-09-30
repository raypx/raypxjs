import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignoreDependencies: ["tsx", "postcss", "@turbo/gen", "@commitlint/cli", "consola", "vite"],
  ignoreBinaries: ["changeset:publish"],
  ignore: ["turbo/generators/**", "**/*.css", "**/envs.ts"],
  ignoreExportsUsedInFile: true,
  drizzle: true,
  workspaces: {
    ".": {
      entry: ["*.config.{js,ts,mjs}", "turbo.json"],
      ignore: [
        "**/*.d.ts",
        "**/dist/**",
        "**/out/**",
        "**/.turbo/**",
        "**/.webpack/**",
        "**/coverage/**",
        "**/build/**",
        "**/.next/**",
        "**/node_modules/**",
        "**/*.min.js",
        "**/i18n/request.ts",
      ],
    },
    "apps/web": {
      entry: ["src/**/*.{ts,tsx}", "src/env.ts"],
      project: ["src/**/*.{ts,tsx}"],
      next: {
        entry: ["next.config.{js,ts,mjs}"],
      },
    },
    "apps/docs": {
      entry: ["source.config.ts"],
      project: ["**/*.{ts,tsx,mdx,js,mjs}"],
      next: {
        entry: ["next.config.{js,ts,mjs}"],
      },
      ignore: ["env.ts", "lib/source.ts"],
    },
    "packages/auth": {
      entry: [],
      project: ["src/**/*.{ts,tsx}"],
      ignore: ["envs.ts", "src/permissions.ts"],
    },
    "packages/ui": {
      entry: [],
      project: ["src/**/*.{ts,tsx}"],
      ignore: ["postcss.config.mjs"],
      ignoreDependencies: [
        "tailwindcss",
        "tw-animate-css",
        "date-fns",
        "zod",
        "@hookform/resolvers",
      ],
    },
    "tooling/tsconfig": {
      entry: [],
      project: ["*.json"],
      ignoreUnresolved: ["next"],
    },
    "packages/db": {
      entry: ["seed.ts"],
    },
    "packages/email": {
      ignoreDependencies: ["@react-email/preview-server"],
    },
    "tooling/scripts": {
      entry: [],
    },
  },
};

export default config;
