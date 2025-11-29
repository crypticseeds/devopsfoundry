# 🚀 DevOps Foundry

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, high-performance portfolio showcasing DevOps, SRE, and AI Engineering expertise**

[View Live Demo](https://devopsfoundry.com) • [Report Bug](https://github.com/crypticseeds/devopsfoundry/issues) • [Request Feature](https://github.com/crypticseeds/devopsfoundry/issues) • [📋 Linear Project](https://linear.app/devopsfoundry/project/portfolio-site-97fb782a9c1d)

</div>

---

## ✨ Features

- **🎨 Modern Design** - Clean, professional interface with dark mode support
- **⚡ Blazing Fast** - Built with Next.js 16 and optimized for performance
- **📱 Fully Responsive** - Seamless experience across all devices
- **🎯 SEO Optimized** - Meta tags, semantic HTML, and structured data
- **♿ Accessible** - WCAG compliant with keyboard navigation support
- **🔧 Easy Customization** - Centralized content management in `src/data/content.ts`
- **📊 Project Showcase** - Highlight your best DevOps and AI/ML projects
- **✍️ Blog Integration** - Share technical insights and tutorials
- **📧 Contact Form** - Integrated Cal.com scheduling with automated email confirmations
- **📈 Analytics** - PostHog integration for pageviews, unique visitors, and user behavior tracking
- **📬 Email Automation** - Resend integration with template-based email confirmations
- **💾 Lead Management** - Supabase storage for contact form submissions
- **🏆 Certifications Display** - Showcase your professional achievements

---

## 🛠️ Tech Stack

### Core Framework

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development

### Styling & UI

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icons
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark mode support

### Integrations

- **[Cal.com](https://cal.com/)** - Embedded scheduling for contact form
- **[PostHog](https://posthog.com/)** - Product analytics and event tracking
- **[Resend](https://resend.com/)** - Transactional email service with templates
- **[Supabase](https://supabase.com/)** - PostgreSQL database for lead storage

---

## 📁 Project Structure

```
devopsfoundry/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API routes
│   │   │   └── contact/        # Contact form endpoint
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Hero.tsx            # Hero section
│   │   ├── Skills.tsx          # Skills & certifications
│   │   ├── Projects.tsx        # Project showcase
│   │   ├── BlogPreview.tsx     # Blog posts preview
│   │   ├── Contact.tsx         # Contact form
│   │   ├── Footer.tsx          # Footer with social links
│   │   ├── posthog-provider.tsx # PostHog analytics provider
│   │   └── theme-provider.tsx  # Theme context provider
│   ├── lib/                    # Utility libraries
│   │   ├── email.ts            # Resend email utilities
│   │   ├── leads-storage.ts    # Supabase lead storage
│   │   └── posthog.ts          # PostHog analytics
│   └── data/
│       └── content.ts          # Centralized content configuration
├── public/                     # Static assets
│   ├── badges/                 # Certification badges
│   └── Femi-Akinlotan-Resume.pdf
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/crypticseeds/devopsfoundry.git
   cd devopsfoundry
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## ⚙️ Configuration

### Customizing Content

All content is centralized in **`src/data/content.ts`** for easy updates:

```typescript
// Update hero section
export const hero = {
  location: "Your Location",
  title: {
    first: "Your Title",
    second: "Your Subtitle",
  },
  description: "Your description...",
  // ...
};

// Add/edit projects
export const projects = [
  {
    title: "Project Name",
    description: "Project description...",
    tags: ["Tag1", "Tag2"],
    links: {
      github: "https://github.com/...",
      demo: "https://...",
      writeup: "/blog/...",
    },
  },
];

// Add/edit blog posts
export const blogPosts = [
  {
    title: "Post Title",
    summary: "Post summary...",
    date: "MMM DD, YYYY",
    tags: ["Tag1", "Tag2"],
    slug: "post-slug",
  },
];
```

### Environment Variables

Environment variables are managed via [Doppler](https://doppler.com/) for secure configuration:

**Required:**

- `RESEND_API_KEY` - Resend API key for email sending
- `RESEND_CONTACT_TEMPLATE_ID` - Resend template ID for contact confirmations
- `RESEND_ADMIN_TEMPLATE_ID` - Resend template ID for admin notifications
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `POSTHOG_API_KEY` - PostHog server-side API key
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog client-side API key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host URL (optional)

**Optional:**

- `FROM_EMAIL` - Email sender address (required for email sending)
- `FROM_NAME` - Display name for email sender
- `ADMIN_EMAIL` - Admin notification email address
- `NEXT_PUBLIC_SITE_URL` - Site URL for metadata

### Styling

- **Global styles**: `src/app/globals.css`
- **Tailwind config**: `tailwind.config.ts`
- **Theme colors**: Defined in `globals.css` using CSS variables

---

## 📦 Build & Deploy

### Production Build

```bash
npm run build
npm run start
```

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/crypticseeds/devopsfoundry)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Your site will be live in minutes!

### Other Deployment Options

- **[Netlify](https://www.netlify.com/)**
- **[AWS Amplify](https://aws.amazon.com/amplify/)**
- **[Docker](https://docs.docker.com/)** - Use the Next.js standalone output
- **Self-hosted** - Use `npm run build && npm run start`

---

## 🎨 Customization Guide

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and add it to `src/app/page.tsx`
3. Add corresponding data to `src/data/content.ts`

### Changing Colors

Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --accent-blue: 217 91% 60%;
  /* ... */
}
```

### Adding Certifications

1. Add badge images to `public/badges/`
2. Update the `certifications` array in `src/data/content.ts`

### Adding a Featured Project

To add a new project to the **Featured Projects** section on the homepage:

1. Add your project banner image to `public/projects/`
2. Add a new object to the `projects` array in `src/data/content.ts`:

```typescript
{
    title: "Project Name",
    description: "Short description of your project...",
    tags: ["Tag1", "Tag2", "Tag3"],
    image: "/projects/your-project-image.png",
    date: "Mon YYYY",
    links: {
        github: "https://github.com/...",
        demo: "https://...",       // or null if no demo
        writeup: "/projects/...",  // or null if no case study
    },
}
```

| Field           | Description                                |
| --------------- | ------------------------------------------ |
| `title`         | Project name                               |
| `description`   | Short description (2-3 sentences)          |
| `tags`          | Array of technology tags                   |
| `image`         | Banner image path (in `/public/projects/`) |
| `date`          | Display date (e.g., "Jan 2024")            |
| `links.github`  | GitHub repository URL                      |
| `links.demo`    | Live demo URL (or `null`)                  |
| `links.writeup` | Case study/blog post link (or `null`)      |

> **Note:** Featured Projects are separate from the Projects page. The Projects page (`/projects`) automatically reads from MDX files in `content/docs/projects/`.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🙏 Acknowledgments

- **[Next.js](https://nextjs.org/)** - The React Framework
- **[Vercel](https://vercel.com/)** - Deployment platform
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling framework
- **[Lucide](https://lucide.dev/)** - Icon library
- **[Cal.com](https://cal.com/)** - Scheduling integration
- **[PostHog](https://posthog.com/)** - Product analytics
- **[Resend](https://resend.com/)** - Email service
- **[Supabase](https://supabase.com/)** - Database platform

---

## 📧 Contact

**Femi Akinlotan** - DevOps, SRE & Platform Engineer

- 🌐 Website: [devopsfoundry.com](https://devopsfoundry.com)
- 💼 LinkedIn: [linkedin.com/in/femi-akinlotan](https://www.linkedin.com/in/femi-akinlotan/)
- 🐙 GitHub: [@crypticseeds](https://github.com/crypticseeds)
- 🐦 X/Twitter: [@crypticseeds](https://x.com/crypticseeds)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Femi Akinlotan](https://github.com/crypticseeds)

</div>
