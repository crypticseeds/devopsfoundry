import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { blogSource } from "@/lib/sources";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{
        enabled: true,
        provider: "orama",
        api: "/api/search",
        hotKey: [
          {
            display: "K",
            key: "k",
          },
        ],
      }}
    >
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <DocsLayout
          tree={blogSource.pageTree}
          nav={{ enabled: false }}
          sidebar={{ enabled: false }}
        >
          {children}
        </DocsLayout>
        <Footer />
      </div>
    </RootProvider>
  );
}
