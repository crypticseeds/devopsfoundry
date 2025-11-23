// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { transformerTwoslash } from "fumadocs-twoslash";
import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
var blogs = defineDocs({
  dir: "content/docs/blogs"
});
var projects = defineDocs({
  dir: "content/docs/projects"
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
  projects
};
