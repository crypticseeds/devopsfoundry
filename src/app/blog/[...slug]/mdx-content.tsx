"use client";

import { useMDXComponents } from "../../../../mdx-components";
import type { MDXComponents } from "mdx/types";

interface MDXContentProps {
  MDX: React.ComponentType<{ components?: MDXComponents }>;
}

export function MDXContent({ MDX }: MDXContentProps) {
  const components = useMDXComponents({});
  return <MDX components={components} />;
}

