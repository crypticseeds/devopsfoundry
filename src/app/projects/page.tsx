import Link from 'next/link';
import { projectsSource } from '@/lib/sources';
import { Breadcrumbs, createProjectBreadcrumbs } from '@/components/Breadcrumbs';

export default function ProjectsPage() {
    const docs = projectsSource.getPages();

    return (
        <main className="flex-1 bg-secondary/5">
            <div className="max-w-6xl mx-auto px-4 py-24 pt-32">
                <Breadcrumbs items={createProjectBreadcrumbs({})} />

                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4 md:text-5xl">Projects</h1>
                    <p className="text-secondary text-lg max-w-2xl mx-auto">
                        In-depth technical documentation for projects and systems
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {docs.map((doc) => (
                        <Link
                            key={doc.url}
                            href={doc.url}
                            className="group block p-8 rounded-2xl border border-secondary/20 bg-background shadow-sm transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-md"
                        >
                            <h2 className="text-2xl font-semibold mb-3 group-hover:text-accent-blue transition-colors">
                                {doc.data.title}
                            </h2>
                            {doc.data.description && (
                                <p className="text-secondary mb-4 line-clamp-3">
                                    {doc.data.description}
                                </p>
                            )}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {(doc.data as any).tags && (doc.data as any).tags.slice(0, 3).map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="text-xs px-2 py-1 rounded-md bg-secondary/10 text-secondary font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>

                {docs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-secondary text-lg">No projects yet. Check back soon!</p>
                    </div>
                )}
            </div>
        </main>
    );
}
