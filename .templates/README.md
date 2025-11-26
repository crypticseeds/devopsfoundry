# Content Templates

This directory contains templates for creating consistent blog posts and project documentation.

## Available Templates

### Blog Post Template

**Location**: `blog-post-template.mdx`

**Usage**:

1. Copy the template to your blogs directory:
   ```bash
   cp .templates/blog-post-template.mdx content/docs/blogs/your-blog-title.mdx
   ```
2. Update the frontmatter (title, description, date, tags)
3. Replace all placeholder content marked with `[brackets]`
4. Maintain the hierarchical H2/H3/H4 structure for optimal TOC display

**Key Features**:

- Pre-structured sections for consistent blog posts
- Hierarchical headings for better TOC navigation
- Sections include: Overview, Problem, Solution, Implementation, Best Practices, Common Pitfalls, Real-World Example, Advanced Topics, Resources

###Project Post Template

**Location**: `project-post-template.mdx`

**Usage**:

1. Copy the template to your projects directory:
   ```bash
   cp .templates/project-post-template.mdx content/docs/projects/your-project-name.mdx
   ```
2. Update the frontmatter (title, description, date, tags, github, demo)
3. Replace all placeholder content marked with `[brackets]`
4. Maintain the hierarchical H2/H3/H4 structure for optimal TOC display

**Key Features**:

- Comprehensive project documentation structure
- Sections include: Overview, Architecture, Implementation, Features, Technical Challenges, Performance, Testing, Deployment, Future Enhancements, Lessons Learned

## Why These Templates?

These templates ensure:

1. **Consistent TOC Navigation**: All documentation uses the same "clerk" style hierarchical TOC
2. **Complete Documentation**: Templates remind you to document all important aspects
3. **Professional Appearance**: Structured content is easier to read and navigate
4. **Better SEO**: Proper heading hierarchy improves search engine optimization

## Template Maintenance

When updating these templates:

- Ensure code blocks are properly closed (even number of ```)
- Use valid placeholder values in frontmatter
- Test templates by copying them to content directory temporarily
- Keep the hierarchical heading structure (H2 > H3 > H4)
