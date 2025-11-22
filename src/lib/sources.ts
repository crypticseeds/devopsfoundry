import { blogs, projects, tutorials } from 'fumadocs-mdx:collections/server';
import { loader } from 'fumadocs-core/source';

export const blogSource = loader({
    baseUrl: '/blog',
    source: blogs.toFumadocsSource(),
});

export const projectsSource = loader({
    baseUrl: '/projects',
    source: projects.toFumadocsSource(),
});

export const tutorialSource = loader({
    baseUrl: '/tutorials',
    source: tutorials.toFumadocsSource(),
});
