import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tutorialSource } from '@/lib/sources';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { LLMCopyButton } from '@/components/ai/llm-copy-button';
import { ViewOptions } from '@/components/ai/view-options';

interface TutorialPageProps {
    params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
    return tutorialSource.getPages().map((page) => ({
        slug: page.slugs,
    }));
}

export async function generateMetadata(props: TutorialPageProps): Promise<Metadata> {
    const params = await props.params;
    const page = tutorialSource.getPage(params.slug);

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
    const page = tutorialSource.getPage(params.slug);

    if (!page) {
        notFound();
    }

    const MDX = page.data.body;

    return (
        <DocsPage toc={page.data.toc} tableOfContent={{ style: 'clerk' }}>
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
                        githubUrl={`https://github.com/crypticseeds/devopsfoundry/blob/main/content/docs/tutorials/${page.slugs.join('/')}.mdx`}
                    />
                </div>

                <MDX />
            </DocsBody>
        </DocsPage>
    );
}
