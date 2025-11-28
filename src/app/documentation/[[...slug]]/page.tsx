import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { documentationSource } from "@/lib/sources";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { LLMCopyButton } from "@/components/ai/llm-copy-button";
import { ViewOptions } from "@/components/ai/view-options";
import { Feedback } from "@/components/feedback";
import { onRateAction } from "@/lib/feedback-action";
import type { FumadocsPageWithBody } from "@/types/fumadocs";
import { getMDXComponents } from "../../../../mdx-components";

interface TutorialPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  return documentationSource.getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export async function generateMetadata(
  props: TutorialPageProps,
): Promise<Metadata> {
  const params = await props.params;

  // If no slug, use first page for metadata (will redirect anyway)
  if (!params.slug || params.slug.length === 0) {
    const pages = documentationSource.getPages();
    if (pages.length > 0) {
      const firstPage = pages[0];
      return {
        title: firstPage.data.title,
        description: firstPage.data.description,
      };
    }
    return {};
  }

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

  // If no slug is provided, redirect to the first documentation page
  if (!params.slug || params.slug.length === 0) {
    const pages = documentationSource.getPages();
    if (pages.length > 0) {
      const firstPage = pages[0];
      redirect(`/documentation/${firstPage.slugs.join("/")}`);
    }
    notFound();
  }

  const page = documentationSource.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const pageWithBody = page as typeof page & FumadocsPageWithBody;
  const MDX =
    pageWithBody.body ||
    (page.data as unknown as { body?: typeof pageWithBody.body }).body;

  if (!MDX) {
    notFound();
  }

  return (
    <DocsPage
      toc={
        pageWithBody.toc ||
        (page.data as unknown as { toc?: typeof pageWithBody.toc }).toc
      }
      tableOfContent={{ style: "clerk", enabled: true }}
      footer={{ enabled: false }}
    >
      <DocsBody>
        <h1>{page.data.title}</h1>
        {page.data.description && (
          <p className="text-lg text-muted-foreground mb-8">
            {page.data.description}
          </p>
        )}

        <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6 mb-6">
          <LLMCopyButton markdownUrl={`/llms.mdx/${page.slugs.join("/")}`} />
          <ViewOptions
            markdownUrl={`/llms.mdx/${page.slugs.join("/")}`}
            githubUrl={`https://github.com/crypticseeds/devopsfoundry/blob/main/content/docs/documentation/${page.slugs.join("/")}.mdx`}
          />
        </div>

        <MDX components={getMDXComponents({})} />
      </DocsBody>

      {/* Feedback component */}
      <Feedback onRateAction={onRateAction} />
    </DocsPage>
  );
}
