import Link from 'next/link';
import { Home, BookOpen, FileText, Lightbulb, FileCode, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ReactNode;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-secondary !p-0 !m-0 list-none">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex items-center gap-2">
                            {index > 0 && (
                                <ChevronRight
                                    className="w-4 h-4 text-secondary/50"
                                    aria-hidden="true"
                                />
                            )}

                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-1.5 hover:text-accent-blue transition-colors no-underline"
                                >
                                    {item.icon && (
                                        <span className="inline-flex" aria-hidden="true">
                                            {item.icon}
                                        </span>
                                    )}
                                    <span>{item.label}</span>
                                </Link>
                            ) : (
                                <span
                                    className={`flex items-center gap-1.5 ${isLast ? 'text-foreground font-medium' : ''
                                        }`}
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {item.icon && (
                                        <span className="inline-flex" aria-hidden="true">
                                            {item.icon}
                                        </span>
                                    )}
                                    <span>{item.label}</span>
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

// Helper function to create breadcrumbs for blog pages
export function createBlogBreadcrumbs(options: {
    page?: number;
    postTitle?: string;
}): BreadcrumbItem[] {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            label: 'Home',
            href: '/',
            icon: <Home className="w-4 h-4" />,
        },
        {
            label: 'Blog',
            href: '/blog',
            icon: <BookOpen className="w-4 h-4" />,
        },
    ];

    if (options.postTitle) {
        // Individual blog post
        breadcrumbs.push({
            label: options.postTitle,
            icon: <FileText className="w-4 h-4" />,
        });
    } else if (options.page && options.page > 1) {
        // Blog listing with pagination
        breadcrumbs.push({
            label: `Page ${options.page}`,
        });
    }

    return breadcrumbs;
}

// Helper function to create breadcrumbs for project pages
export function createProjectBreadcrumbs(options: {
    page?: number;
    projectTitle?: string;
}): BreadcrumbItem[] {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            label: 'Home',
            href: '/',
            icon: <Home className="w-4 h-4" />,
        },
        {
            label: 'Projects',
            href: '/projects',
            icon: <Lightbulb className="w-4 h-4" />,
        },
    ];

    if (options.projectTitle) {
        // Individual project
        breadcrumbs.push({
            label: options.projectTitle,
            icon: <FileCode className="w-4 h-4" />,
        });
    } else if (options.page && options.page > 1) {
        // Projects listing with pagination
        breadcrumbs.push({
            label: `Page ${options.page}`,
        });
    }

    return breadcrumbs;
}

