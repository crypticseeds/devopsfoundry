import { blogSource } from "@/lib/sources";
import {
  Breadcrumbs,
  createBlogBreadcrumbs,
} from "@/components/Breadcrumbs";
import { BlogList } from "@/components/BlogList";

interface BlogFrontmatter {
  date?: string;
  author?: string;
  tags?: string[];
  banner?: string;
}

export default function BlogPage() {
  const posts = blogSource.getPages();

  // Serialize posts to plain objects
  const serializedPosts = posts.map((post) => {
    const frontmatter = post.data as typeof post.data & BlogFrontmatter;
    return {
      url: post.url,
      slugs: post.slugs,
      data: {
        title: post.data.title,
        description: post.data.description || "",
        date: frontmatter.date,
        author: frontmatter.author,
        tags: frontmatter.tags || [],
        banner: frontmatter.banner,
      },
    };
  });

  return (
    <main className="flex-1 bg-background">
      <div className="max-w-6xl mx-auto px-6 py-24 pt-32">
        <Breadcrumbs items={createBlogBreadcrumbs({})} />

        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-4 md:text-5xl">Blog</h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Insights on DevOps, SRE, Cloud Infrastructure, and Platform
            Engineering
          </p>
        </div>

        <BlogList posts={serializedPosts} />
      </div>
    </main>
  );
}
