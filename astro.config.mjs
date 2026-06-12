import { defineConfig } from "astro/config";

import remarkObsidian from "./src/plugins/remark-obsidian.ts";

export default defineConfig({
  site: "https://usephjo.github.io",
  markdown: {
    remarkPlugins: [remarkObsidian],
  },
});
