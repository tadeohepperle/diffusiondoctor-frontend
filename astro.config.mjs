// https://astro.build/config
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import markdownIntegration from "@astropub/md";
import remarkGfm from "remark-gfm";

// https://astro.build/config
export default defineConfig({
  outDir: "./dist",
  site: "https://diffusiondoctor.com",
  integrations: [
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx(),
    sitemap(),
    react(),
    markdownIntegration(),
  ],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    // syntaxHighlight: 'shiki'
    // syntaxHighlight: 'prism'
  },
});
