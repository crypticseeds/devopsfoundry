import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogSource } from '@/lib/sources';
import { Breadcrumbs, createBlogBreadcrumbs } from '@/components/Breadcrumbs';

interface BlogPostPageProps {
    params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
    return blogSource.getPages().map((page) => ({
        slug: page.slugs,
    }));
}

export async function generateMetadata(props: BlogPostPageProps): Promise<Metadata> {
    const params = await props.params;
    const page = blogSource.getPage(params.slug);

    if (!page) {
        return {};
    }

    return {
        title: page.data.title,
        description: page.data.description,
    };
}

export default async function BlogPostPage(props: BlogPostPageProps) {
    const params = await props.params;
    const page = blogSource.getPage(params.slug);

    if (!page) {
        notFound();
    }

    const MDX = page.data.body;

    return (
        <div className="min-h-screen bg-background">
            <article className="max-w-4xl mx-auto px-4 py-16">
                <Breadcrumbs items={createBlogBreadcrumbs({ postTitle: page.data.title })} />

                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">{page.data.title}</h1>
                    {page.data.description && (
                        <p className="text-xl text-secondary mb-4">
                            {page.data.description}
                        </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-secondary">
                        {(page.data as any).date && (
                            <time>
                                {new Date((page.data as any).date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                        )}
                        {(page.data as any).author && <span>by {(page.data as any).author}</span>}
                    </div>
                </header>

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <MDX />
                </div>

                {(page.data as any).tags && (page.data as any).tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-foreground/10">
                        <div className="flex flex-wrap gap-2">
                            {(page.data as any).tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-sm rounded-full bg-accent-blue/10 text-accent-blue"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
}
