import { blogSource } from "@/lib/sources";
import { createFromSource } from "fumadocs-core/search/server";

export const { GET } = createFromSource(blogSource, {
  language: "english",
  buildIndex(page) {
    const frontmatter = page.data as typeof page.data & {
      tags?: string[];
    };

    return {
      title: page.data.title,
      description: page.data.description || "",
      url: page.url,
      id: page.url,
      tags: frontmatter.tags?.join(" ") || "",
    };
  },
});
