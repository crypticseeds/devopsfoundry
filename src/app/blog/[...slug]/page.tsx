import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogSource } from '@/lib/sources';
import { Breadcrumbs, createBlogBreadcrumbs } from '@/components/Breadcrumbs';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { LLMCopyButton } from '@/components/ai/llm-copy-button';
import { ViewOptions } from '@/components/ai/view-options';

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
    const tags = (page.data as any).tags || [];

    return (
        <DocsPage 
            toc={page.data.toc} 
            tableOfContent={{ style: 'clerk' }}
        >
                <DocsBody>
                    <Breadcrumbs items={createBlogBreadcrumbs({ postTitle: page.data.title })} />
                    
                    <h1 className="text-4xl font-bold mb-4 mt-6">
                        {page.data.title}
                    </h1>
                    
                    {page.data.description && (
                        <p className="text-xl text-secondary mb-4">
                            {page.data.description}
                        </p>
                    )}

                    {/* Tags - Prominently Displayed */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1.5 text-sm font-medium rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6 mb-6">
                        <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
                        <ViewOptions
                            markdownUrl={`${page.url}.mdx`}
                            githubUrl={`https://github.com/crypticseeds/devopsfoundry/blob/main/content/docs/blogs/${page.slugs.join('/')}.mdx`}
                        />
                    </div>

                    <div className="flex items-center gap-4 text-sm text-secondary border-t border-b border-secondary/20 py-4 mb-8">
                        {(page.data as any).date && (
                            <time className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                                    <line x1="16" x2="16" y1="2" y2="6"/>
                                    <line x1="8" x2="8" y1="2" y2="6"/>
                                    <line x1="3" x2="21" y1="10" y2="10"/>
                                </svg>
                                {new Date((page.data as any).date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                        )}
                        {(page.data as any).author && (
                            <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>
                                {(page.data as any).author}
                            </span>
                        )}
                    </div>

                    <MDX />
                </DocsBody>
        </DocsPage>
    );
}
