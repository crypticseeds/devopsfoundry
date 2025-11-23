import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['typescript', 'twoslash'],
  async rewrites() {
    return [
      {
        source: '/blog/:path*.mdx',
        destination: '/llms.mdx/:path*',
      },
      {
        source: '/projects/:path*.mdx',
        destination: '/llms.mdx/:path*',
      },
      {
        source: '/documentation/:path*.mdx',
        destination: '/llms.mdx/:path*',
      },
    ];
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
