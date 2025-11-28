import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["typescript", "twoslash"],

  // Disable source maps in production for security
  productionBrowserSourceMaps: false,

  // Security headers and CORS configuration
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        // Additional headers for API routes
        source: "/api/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
        ],
      },
      {
        // robots.txt specific header
        source: "/robots.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/blog/:path*.mdx",
        destination: "/llms.mdx/:path*",
      },
      {
        source: "/projects/:path*.mdx",
        destination: "/llms.mdx/:path*",
      },
      {
        source: "/tutorials/:path*.mdx",
        destination: "/llms.mdx/:path*",
      },
    ];
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
