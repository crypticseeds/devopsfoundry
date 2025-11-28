import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { transformerTwoslash } from "fumadocs-twoslash";
import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import type { ShikiTransformer } from "shiki";

import { z } from "zod";

// Language display names mapping
const languageDisplayNames: Record<string, string> = {
  js: "JavaScript",
  javascript: "JavaScript",
  ts: "TypeScript",
  typescript: "TypeScript",
  tsx: "TSX",
  jsx: "JSX",
  py: "Python",
  python: "Python",
  bash: "Bash",
  sh: "Shell",
  shell: "Shell",
  zsh: "Zsh",
  yaml: "YAML",
  yml: "YAML",
  json: "JSON",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  sql: "SQL",
  go: "Go",
  rust: "Rust",
  java: "Java",
  kotlin: "Kotlin",
  swift: "Swift",
  cpp: "C++",
  c: "C",
  csharp: "C#",
  cs: "C#",
  php: "PHP",
  ruby: "Ruby",
  rb: "Ruby",
  dockerfile: "Dockerfile",
  docker: "Docker",
  terraform: "Terraform",
  tf: "Terraform",
  hcl: "HCL",
  nginx: "NGINX",
  apache: "Apache",
  groovy: "Groovy",
  gradle: "Gradle",
  xml: "XML",
  markdown: "Markdown",
  md: "Markdown",
  mdx: "MDX",
  graphql: "GraphQL",
  prisma: "Prisma",
  toml: "TOML",
  ini: "INI",
  env: "Environment",
  txt: "Text",
  plaintext: "Text",
};

// Custom transformer to add language title to code blocks
const transformerLanguageTitle: ShikiTransformer = {
  name: "rehype-code:lang-title",
  pre(pre) {
    const lang = this.options.lang;
    // Only set title if language exists and no title is already set
    if (lang && !pre.properties.title) {
      // Use display name if available, otherwise capitalize the language
      const displayName =
        languageDisplayNames[lang.toLowerCase()] ||
        lang.charAt(0).toUpperCase() + lang.slice(1);
      pre.properties.title = displayName;
    }
    return pre;
  },
};

export const blogs = defineDocs({
  dir: "content/docs/blogs",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.coerce.string().optional(),
      banner: z.string().optional(),
      author: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  },
});

export const projects = defineDocs({
  dir: "content/docs/projects",
  docs: {
    schema: frontmatterSchema.extend({
      banner: z.string().optional(),
      date: z.coerce.string().optional(),
      author: z.string().optional(),
      project: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  },
});

export const tutorials = defineDocs({
  dir: "content/docs/tutorials",
});

export const documentation = defineDocs({
  dir: "content/docs/documentation",
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkMdxMermaid],
    rehypePlugins: (v) => [rehypeKatex, ...v],
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerLanguageTitle,
        transformerTwoslash(),
      ],
    },
  },
});
