import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { BlogPreview } from "@/components/BlogPreview";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { blogSource } from "@/lib/sources";
import { parseISODate, formatDateLong } from "@/lib/date-utils";

interface BlogFrontmatter {
  date?: string;
  author?: string;
  tags?: string[];
  banner?: string;
  featured?: boolean;
}

export default function Home() {
  // Fetch blog posts dynamically
  const posts = blogSource.getPages();

  // Serialize posts to plain objects (same format as blog page)
  const serializedPosts = posts.map((post) => {
    const frontmatter = post.data as typeof post.data & BlogFrontmatter;

    // Format date on server to avoid hydration mismatch
    let formattedDate: string | undefined;
    let rawDate: Date | undefined;
    if (frontmatter.date) {
      const parsedDate = parseISODate(frontmatter.date);
      rawDate = parsedDate || undefined;
      if (rawDate) {
        formattedDate = formatDateLong(rawDate);
      }
    }

    return {
      url: post.url,
      slugs: post.slugs,
      data: {
        title: post.data.title || "Untitled",
        description: post.data.description || "",
        date: formattedDate, // Use formatted date instead of raw date
        author: frontmatter.author,
        tags: frontmatter.tags || [],
        banner: frontmatter.banner,
        featured: frontmatter.featured || false,
        rawDateISO: frontmatter.date, // Store ISO string for client-side sorting (Date objects get serialized)
      },
    };
  });

  // Filter and sort: featured posts first, then by date (newest first)
  // Sort on server using Date objects before passing to client
  const featuredPosts = serializedPosts
    .filter((post) => post.data.featured)
    .sort((a, b) => {
      // Sort featured posts by date (newest first) using ISO strings
      const dateA = a.data.rawDateISO ? parseISODate(a.data.rawDateISO) : null;
      const dateB = b.data.rawDateISO ? parseISODate(b.data.rawDateISO) : null;

      if (dateA && dateB) {
        return dateB.getTime() - dateA.getTime();
      }
      // If one has a date and the other doesn't, prioritize the one with date
      if (dateA) return -1;
      if (dateB) return 1;
      return 0;
    })
    .slice(0, 3); // Limit to 3 featured posts

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased selection:bg-accent-blue/20 selection:text-accent-blue">
      <Header />
      <main className="flex-1">
        <Hero />
        <Skills />
        <Projects />
        {featuredPosts.length > 0 ? (
          <BlogPreview posts={featuredPosts} />
        ) : (
          <section id="blog" className="py-24 relative">
            <div className="mx-auto max-w-6xl px-6">
              <div className="mb-16 flex flex-col items-center text-center">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                  Recent Writing
                </h2>
                <p className="max-w-2xl text-secondary">
                  Thoughts on building reliable systems, platform engineering,
                  and the future of AI infrastructure.
                </p>
              </div>
              <div className="text-center py-12">
                <p className="text-secondary text-lg">
                  No blog posts yet. Check back later!
                </p>
              </div>
            </div>
          </section>
        )}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
