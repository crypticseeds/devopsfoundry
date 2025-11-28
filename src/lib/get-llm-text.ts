import type { InferPageType } from "fumadocs-core/source";
import {
  blogSource,
  projectsSource,
  tutorialSource,
  documentationSource,
} from "@/lib/sources";
import type { FumadocsPageWithBody } from "@/types/fumadocs";

type PageType =
  | InferPageType<typeof blogSource>
  | InferPageType<typeof projectsSource>
  | InferPageType<typeof tutorialSource>
  | InferPageType<typeof documentationSource>;

export async function getLLMText(page: PageType) {
  const pageWithBody = page as typeof page & FumadocsPageWithBody;
  const raw = (await pageWithBody.getText?.("raw")) ?? "";

  return `# ${page.data.title}

URL: ${page.url}

${page.data.description || ""}

${raw}`;
}
