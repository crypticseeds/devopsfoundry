import type { InferPageType } from 'fumadocs-core/source';
import { blogSource, projectsSource, tutorialSource } from '@/lib/sources';

type PageType = 
  | InferPageType<typeof blogSource>
  | InferPageType<typeof projectsSource>
  | InferPageType<typeof tutorialSource>;

export async function getLLMText(page: PageType) {
  const raw = await page.data.getText('raw');

  return `# ${page.data.title}

URL: ${page.url}

${page.data.description || ''}

${raw}`;
}

