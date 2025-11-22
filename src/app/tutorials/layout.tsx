import type { ReactNode } from 'react';
import Image from 'next/image';
import { RootProvider } from 'fumadocs-ui/provider';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { tutorialSource } from '@/lib/sources';

export default function TutorialsLayout({ children }: { children: ReactNode }) {
    return (
        <RootProvider>
            <DocsLayout
                tree={tutorialSource.pageTree}
                nav={{
                    title: (
                        <div className="flex items-center gap-3">
                            <Image
                                src="/logo-mark.png"
                                alt="Logo"
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <span>Tutorials</span>
                        </div>
                    ),
                }}
            >
                {children}
            </DocsLayout>
        </RootProvider>
    );
}
