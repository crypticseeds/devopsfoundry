import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

export const blogs = defineDocs({
    dir: 'content/docs/blogs',
});

export const projects = defineDocs({
    dir: 'content/docs/projects',
});

export const tutorials = defineDocs({
    dir: 'content/docs/tutorials',
});

export default defineConfig({
    mdxOptions: {
        rehypeCodeOptions: {
            themes: {
                light: 'github-light',
                dark: 'github-dark',
            },
        },
    },
});
