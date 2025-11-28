"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { BlogSearch } from "./BlogSearch";

interface BlogPost {
  url: string;
  slugs: string[];
  data: {
    title: string;
    description: string;
    date?: string;
    author?: string;
    tags: string[];
    banner?: string;
  };
}

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts: allPosts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const posts = useMemo(() => {
    if (!searchQuery.trim()) {
      return allPosts;
    }

    const query = searchQuery.toLowerCase();
    return allPosts.filter((post) => {
      const tags = post.data.tags || [];
      const searchableText = [post.data.title, post.data.description, ...tags]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [allPosts, searchQuery]);

  return (
    <>
      <BlogSearch query={searchQuery} onSearchChange={setSearchQuery} />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg"
          >
            {/* Image Banner */}
            <div className="relative h-48 w-full overflow-hidden bg-muted">
              {post.data.banner ? (
                <Image
                  src={post.data.banner}
                  alt={post.data.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-secondary/10">
                  <BookOpen className="h-12 w-12 text-secondary/50" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
              {/* Meta Data */}
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span>{post.data.author || "Femi Akinlotan"}</span>
                {post.data.date && (
                  <>
                    <span>•</span>
                    <span>
                      {new Date(post.data.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </>
                )}
              </div>

              <h2 className="mb-2 text-xl font-bold tracking-tight text-card-foreground transition-colors group-hover:text-accent-blue">
                {post.data.title}
              </h2>

              {post.data.description && (
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {post.data.description}
                </p>
              )}

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2">
                  {post.data.tags &&
                    post.data.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-2.5 py-0.5 text-[10px] font-medium text-secondary transition-colors hover:border-secondary/40 hover:text-foreground hover:bg-secondary/10"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-secondary text-lg">
            {searchQuery
              ? "No posts found matching your search."
              : "No blog posts yet. Check back soon!"}
          </p>
        </div>
      )}
    </>
  );
}
