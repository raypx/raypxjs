import { createConfig } from "@raypx/next-config";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const config = createConfig({
  withMDX,
  i18n: "./i18n/request.ts",
});

export default config;
