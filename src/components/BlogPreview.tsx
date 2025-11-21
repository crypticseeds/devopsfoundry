import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { blogPosts } from "@/data/content"

export function BlogPreview() {
    return (
        <section id="blog" className="bg-secondary/5 py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mb-16 flex flex-col items-center text-center">
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">Recent Writing</h2>
                    <p className="max-w-2xl text-secondary">
                        Thoughts on building reliable systems, platform engineering, and the future of AI infrastructure.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {blogPosts.map((post) => (
                        <article
                            key={post.slug}
                            className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-white/5"
                        >
                            <div className="flex flex-1 flex-col">
                                <div className="mb-4 flex items-center gap-2 text-xs text-secondary">
                                    <Calendar className="h-3 w-3" />
                                    <time>{post.date}</time>
                                </div>
                                <h3 className="mb-3 text-lg font-bold leading-tight transition-colors group-hover:text-accent-blue">
                                    {post.title}
                                </h3>
                                <p className="mb-6 flex-1 text-sm leading-relaxed text-secondary">
                                    {post.summary}
                                </p>
                                <div className="mb-6 flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-md bg-secondary/10 px-2 py-1 text-[10px] font-medium text-secondary"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-secondary/10 pt-4">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="flex items-center gap-1 text-xs font-bold text-foreground transition-colors hover:text-accent-blue ml-auto"
                                >
                                    Read more
                                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
