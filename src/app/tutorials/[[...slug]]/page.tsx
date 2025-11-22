import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tutorialSource } from '@/lib/sources';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';

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
                <MDX />
            </DocsBody>
        </DocsPage>
    );
}
