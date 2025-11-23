import Link from 'next/link';
import { blogSource } from '@/lib/sources';
import { Breadcrumbs, createBlogBreadcrumbs } from '@/components/Breadcrumbs';

export default function BlogPage() {
    const posts = blogSource.getPages();

    return (
        <div className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased selection:bg-accent-blue/20 selection:text-accent-blue">
            <main className="flex-1 bg-secondary/5">
                <div className="max-w-6xl mx-auto px-4 py-24 pt-32">
                    <Breadcrumbs items={createBlogBreadcrumbs({})} />

                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-bold mb-4 md:text-5xl">Blog</h1>
                        <p className="text-secondary text-lg max-w-2xl mx-auto">
                            Insights on DevOps, SRE, Cloud Infrastructure, and Platform Engineering
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Link
                                key={post.url}
                                href={post.url}
                                className="group block p-6 rounded-2xl border border-secondary/20 bg-background shadow-sm transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md"
                            >
                                <h2 className="text-2xl font-semibold mb-2 group-hover:text-accent-blue transition-colors">
                                    {post.data.title}
                                </h2>
                                {post.data.description && (
                                    <p className="text-secondary mb-4 line-clamp-3">
                                        {post.data.description}
                                    </p>
                                )}
                                {(post.data as any).date && (
                                    <time className="text-sm text-secondary">
                                        {new Date((post.data as any).date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </time>
                                )}
                            </Link>
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-secondary text-lg">No blog posts yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
