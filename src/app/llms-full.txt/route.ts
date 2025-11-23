import { blogSource, projectsSource, documentationSource } from '@/lib/sources';
import { getLLMText } from '@/lib/get-llm-text';

// Cached forever
export const revalidate = false;

export async function GET() {
    const allPages = [
        ...projectsSource.getPages().map((page) => ({
            ...page,
            url: `/projects/${page.slugs.join('/')}`,
        })),
        ...documentationSource.getPages().map((page) => ({
            ...page,
            url: `/documentation/${page.slugs.join('/')}`,
        })),
    ];

    const scan = allPages.map(getLLMText);
    const scanned = await Promise.all(scan);

    return new Response(scanned.join('\n\n---\n\n'), {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}

