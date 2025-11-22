// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
var blogs = defineDocs({
  dir: "content/docs/blogs"
});
var projects = defineDocs({
  dir: "content/docs/projects"
});
var tutorials = defineDocs({
  dir: "content/docs/tutorials"
});
var source_config_default = defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark"
      }
    }
  }
});
export {
  blogs,
  source_config_default as default,
  projects,
  tutorials
};
