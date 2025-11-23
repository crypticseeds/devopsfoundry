import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { documentationSource } from '@/lib/sources';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { LLMCopyButton } from '@/components/ai/llm-copy-button';
import { ViewOptions } from '@/components/ai/view-options';

interface TutorialPageProps {
    params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
    return documentationSource.getPages().map((page) => ({
        slug: page.slugs,
    }));
}

export async function generateMetadata(props: TutorialPageProps): Promise<Metadata> {
    const params = await props.params;
    const page = documentationSource.getPage(params.slug);

    if (!page) {
        return {};
    }

    return {
        title: page.data.title,
        description: page.data.description,
    };
}

export default async function TutorialPage(props: TutorialPageProps) {
    const params = await props.params;
    const page = documentationSource.getPage(params.slug);

    if (!page) {
        notFound();
    }

    const MDX = page.data.body;

    return (
        <DocsPage toc={page.data.toc} tableOfContent={{ style: 'clerk' }} footer={{ enabled: false }}>
            <DocsBody>
                <h1>{page.data.title}</h1>
                {page.data.description && (
                    <p className="text-lg text-muted-foreground mb-8">
                        {page.data.description}
                    </p>
                )}

                <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6 mb-6">
                    <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
                    <ViewOptions
                        markdownUrl={`${page.url}.mdx`}
                        githubUrl={`https://github.com/crypticseeds/devopsfoundry/blob/main/content/docs/documentation/${page.slugs.join('/')}.mdx`}
                    />
                </div>

                <MDX />
            </DocsBody>
        </DocsPage>
    );
}
