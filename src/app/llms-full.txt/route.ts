import { blogSource, projectsSource, tutorialSource } from '@/lib/sources';
import { getLLMText } from '@/lib/get-llm-text';

// Cached forever
export const revalidate = false;

export async function GET() {
    const allPages = [
        ...blogSource.getPages(),
        ...projectsSource.getPages(),
        ...tutorialSource.getPages(),
    ];
    
    const scan = allPages.map(getLLMText);
    const scanned = await Promise.all(scan);

    return new Response(scanned.join('\n\n---\n\n'), {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}

