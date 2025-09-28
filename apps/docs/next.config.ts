import { createConfig } from "@raypx/next-config";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const config = createConfig({
  withMDX,
});

export default config;
