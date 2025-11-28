import Link from "next/link";
import { findNeighbour } from "fumadocs-core/page-tree";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { PageTree } from "fumadocs-core/source";

interface PostNavigationProps {
  pageTree: PageTree.Item;
  currentUrl: string;
}

export function PostNavigation({
  pageTree,
  currentUrl,
}: PostNavigationProps) {
  const neighbours = findNeighbour(pageTree, currentUrl);

  if (!neighbours.previous && !neighbours.next) {
    return null;
  }

  return (
    <div className="not-prose pt-4 mt-4 pb-12 mb-12">
      <div className="flex flex-col sm:flex-row gap-4">
        {neighbours.previous && (
          <Link
            href={neighbours.previous.url}
            className={cn(
              "flex-1 group flex items-start gap-3 p-4 rounded-lg border border-border",
              "hover:border-primary/50 hover:bg-accent/50 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <div className="flex-shrink-0 mt-0.5">
              <ChevronLeft className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground mb-1">Previous</div>
              <div className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {neighbours.previous.name}
              </div>
            </div>
          </Link>
        )}

        {neighbours.next && (
          <Link
            href={neighbours.next.url}
            className={cn(
              "flex-1 group flex items-start gap-3 p-4 rounded-lg border border-border",
              "hover:border-primary/50 hover:bg-accent/50 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              !neighbours.previous && "sm:ml-auto"
            )}
          >
            <div className="flex-1 min-w-0 text-right">
              <div className="text-xs text-muted-foreground mb-1">Next</div>
              <div className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {neighbours.next.name}
              </div>
            </div>
            <div className="flex-shrink-0 mt-0.5">
              <ChevronRight className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

