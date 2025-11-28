// Type definitions for fumadocs page objects
// These properties exist at runtime but aren't in the type definitions
import type { MDXComponents } from "mdx/types";

export interface FumadocsPageWithBody {
  body: React.ComponentType<{ components?: MDXComponents }>;
  toc?: Array<{
    title: string;
    url: string;
    depth: number;
  }>;
  getText?: (format: string) => Promise<string>;
}
