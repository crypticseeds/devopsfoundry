import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogSource } from "@/lib/sources";
import { Breadcrumbs, createBlogBreadcrumbs } from "@/components/Breadcrumbs";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { LLMCopyButton } from "@/components/ai/llm-copy-button";
import { ViewOptions } from "@/components/ai/view-options";
import { Feedback } from "@/components/feedback";
import { onRateAction } from "@/lib/feedback-action";
import Image from "next/image";
import type { FumadocsPageWithBody } from "@/types/fumadocs";
import { getMDXComponents } from "../../../../mdx-components";

interface BlogPostPageProps {
  params: Promise<{ slug: string[] }>;
}

interface BlogFrontmatter {
  tags?: string[];
  date?: string;
  author?: string;
  banner?: string;
}

export async function generateStaticParams() {
  return blogSource.getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export async function generateMetadata(
  props: BlogPostPageProps,
): Promise<Metadata> {
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

  const pageWithBody = page as typeof page & FumadocsPageWithBody;
  const MDX =
    pageWithBody.body ||
    (page.data as unknown as { body?: typeof pageWithBody.body }).body;
  const frontmatter = page.data as typeof page.data & BlogFrontmatter;
  const tags = frontmatter.tags || [];
  const banner = frontmatter.banner;

  if (!MDX) {
    notFound();
  }

  return (
    <DocsPage
      toc={
        pageWithBody.toc ||
        (page.data as unknown as { toc?: typeof pageWithBody.toc }).toc
      }
      tableOfContent={{ style: "clerk" }}
      footer={{ enabled: false }}
      breadcrumb={{ enabled: false }}
    >
      {/* Breadcrumb - outside DocsBody for proper alignment */}
      <div className="w-full mb-4">
        <Breadcrumbs
          items={createBlogBreadcrumbs({ postTitle: page.data.title })}
        />
      </div>

      {/* Banner image - outside DocsBody, with not-prose to avoid style conflicts */}
      {banner && (
        <div className="not-prose relative w-full aspect-[2/1] rounded-xl overflow-hidden mb-8">
          <Image
            src={banner}
            alt={page.data.title || "Blog post banner"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </div>
      )}

      {/* Title and Description - outside DocsBody */}
      <div className="not-prose mb-3">
        <h1 className="text-3xl font-bold mb-1 md:text-4xl">
          {page.data.title}
        </h1>
        {page.data.description && (
          <p className="text-[15px] italic text-fd-muted-foreground opacity-70">
            {page.data.description}
          </p>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="not-prose flex flex-wrap gap-2 mb-3">
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1 text-xs font-medium text-secondary transition-colors hover:border-secondary/40 hover:text-foreground hover:bg-secondary/10 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions - no border */}
      <div className="not-prose flex flex-row gap-2 items-center mb-3">
        <LLMCopyButton markdownUrl={`/llms.mdx/${page.slugs.join("/")}`} />
        <ViewOptions
          markdownUrl={`/llms.mdx/${page.slugs.join("/")}`}
          githubUrl={`https://github.com/crypticseeds/devopsfoundry/blob/main/content/docs/blogs/${page.slugs.join("/")}.mdx`}
        />
      </div>

      {/* Author and Date */}
      <div className="not-prose flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-b border-border py-3 mb-6">
        {frontmatter.author && (
          <span className="flex items-center gap-2">
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
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {frontmatter.author}
          </span>
        )}
        {frontmatter.date && (
          <time className="flex items-center gap-2">
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
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
      </div>

      <DocsBody>
        <MDX components={getMDXComponents({})} />
      </DocsBody>

      {/* Feedback component */}
      <Feedback onRateAction={onRateAction} />
    </DocsPage>
  );
}
