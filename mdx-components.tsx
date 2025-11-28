import type { MDXComponents } from "mdx/types";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Popup, PopupContent, PopupTrigger } from "fumadocs-twoslash/ui";
import { Mermaid } from "@/components/mdx/mermaid";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    // Twoslash components for TypeScript tooltips
    Popup,
    PopupContent,
    PopupTrigger,
    // Mermaid diagrams
    Mermaid,
    ...components,
  };
}

// Server-safe version that can be called in server components
export function getMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    ...defaultMdxComponents,
    // Twoslash components for TypeScript tooltips
    Popup,
    PopupContent,
    PopupTrigger,
    // Mermaid diagrams
    Mermaid,
    ...components,
  };
}
