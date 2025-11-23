import type { ReactNode } from 'react';
import Image from 'next/image';
import { RootProvider } from 'fumadocs-ui/provider';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { documentationSource } from '@/lib/sources';

export default function TutorialsLayout({ children }: { children: ReactNode }) {
    return (
        <RootProvider>
            <div style={{ "--fd-nav-height": "0rem" } as React.CSSProperties}>
                <DocsLayout
                    tree={documentationSource.pageTree}
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
                                <span>Documentation</span>
                            </div>
                        ),
                    }}
                >
                    {children}
                </DocsLayout>
            </div>
        </RootProvider>
    );
}
