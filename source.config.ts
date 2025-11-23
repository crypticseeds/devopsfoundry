import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import { transformerTwoslash } from 'fumadocs-twoslash';
import { remarkMdxMermaid } from 'fumadocs-core/mdx-plugins';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

export const blogs = defineDocs({
    dir: 'content/docs/blogs',
});

export const projects = defineDocs({
    dir: 'content/docs/projects',
});

export const documentation = defineDocs({
    dir: 'content/docs/documentation',
});

export default defineConfig({
    mdxOptions: {
        remarkPlugins: [remarkMath, remarkMdxMermaid],
        rehypePlugins: (v) => [rehypeKatex, ...v],
        rehypeCodeOptions: {
            themes: {
                light: 'github-light',
                dark: 'github-dark',
            },
            transformers: [
                ...(rehypeCodeDefaultOptions.transformers ?? []),
                transformerTwoslash(),
            ],
        },
    },
});
