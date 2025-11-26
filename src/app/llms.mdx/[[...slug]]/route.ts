import { getLLMText } from "@/lib/get-llm-text";
import {
  blogSource,
  projectsSource,
  tutorialSource,
  documentationSource,
} from "@/lib/sources";
import { notFound } from "next/navigation";

export const revalidate = false;

interface RouteContext {
  params: Promise<{ slug?: string[] }>;
}

function findPageBySlug(slug?: string[]) {
  if (!slug || slug.length === 0) return null;

  const slugStr = slug.join("/");

  // Search in all collections
  const allPages = [
    ...blogSource.getPages(),
    ...projectsSource.getPages(),
    ...tutorialSource.getPages(),
    ...documentationSource.getPages(),
  ];

  return allPages.find((page) => page.slugs.join("/") === slugStr);
}

export async function GET(_req: Request, context: RouteContext) {
  const { slug } = await context.params;
  const page = findPageBySlug(slug);

  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
}

export function generateStaticParams() {
  return [
    ...blogSource.getPages().map((page) => ({ slug: page.slugs })),
    ...projectsSource.getPages().map((page) => ({ slug: page.slugs })),
    ...tutorialSource.getPages().map((page) => ({ slug: page.slugs })),
    ...documentationSource.getPages().map((page) => ({ slug: page.slugs })),
  ];
}
