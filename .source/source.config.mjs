// source.config.ts
import {
  defineDocs,
  defineConfig,
  frontmatterSchema
} from "fumadocs-mdx/config";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { transformerTwoslash } from "fumadocs-twoslash";
import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { z } from "zod";
var blogs = defineDocs({
  dir: "content/docs/blogs",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.coerce.string().optional(),
      banner: z.string().optional(),
      author: z.string().optional(),
      tags: z.array(z.string()).optional()
    })
  }
});
var projects = defineDocs({
  dir: "content/docs/projects",
  docs: {
    schema: frontmatterSchema.extend({
      banner: z.string().optional(),
      date: z.coerce.string().optional(),
      author: z.string().optional(),
      project: z.string().optional(),
      tags: z.array(z.string()).optional()
    })
  }
});
var tutorials = defineDocs({
  dir: "content/docs/tutorials"
});
var documentation = defineDocs({
  dir: "content/docs/documentation"
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkMdxMermaid],
    rehypePlugins: (v) => [rehypeKatex, ...v],
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark"
      },
      transformers: [
        ...rehypeCodeDefaultOptions.transformers ?? [],
        transformerTwoslash()
      ]
    }
  }
});
export {
  blogs,
  source_config_default as default,
  documentation,
  projects,
  tutorials
};
