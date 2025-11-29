"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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

interface BlogPreviewProps {
  posts?: BlogPost[];
}

export function BlogPreview({ posts = [] }: BlogPreviewProps) {
  return (
    <section id="blog" className="py-24 relative">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Recent Writing
          </h2>
          <p className="max-w-2xl text-secondary">
            Thoughts on building reliable systems, platform engineering, and the
            future of AI infrastructure.
          </p>
        </motion.div>

        {posts && posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => {
              // Extract slug from slugs array for the link
              const slug = post.slugs.join("/");

              return (
                <motion.div
                  key={post.url}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-secondary/50"
                        >
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                        </svg>
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
                          <span>{post.data.date}</span>
                        </>
                      )}
                    </div>

                    <Link href={`/blog/${slug}`}>
                      <h3 className="mb-2 text-xl font-bold tracking-tight text-card-foreground transition-colors group-hover:text-accent-blue cursor-pointer">
                        {post.data.title}
                      </h3>
                    </Link>

                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {post.data.description}
                    </p>

                    <div className="mt-auto">
                      <div className="mb-4 flex flex-wrap gap-2">
                        {post.data.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-2.5 py-0.5 text-[10px] font-medium text-secondary transition-colors hover:border-secondary/40 hover:text-foreground hover:bg-secondary/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-end pt-4 border-t border-border">
                        <Link
                          href={`/blog/${slug}`}
                          className="flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-accent-blue"
                        >
                          Read more
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-transform group-hover:translate-x-1"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-secondary text-lg">
              No blog posts yet. Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
