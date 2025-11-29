"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track pageviews on route change
    if (pathname && typeof window !== "undefined") {
      // Check if PostHog is initialized
      if (posthog.__loaded) {
        let url = window.origin + pathname;
        if (searchParams && searchParams.toString()) {
          url = url + `?${searchParams.toString()}`;
        }
        posthog.capture("$pageview", {
          $current_url: url,
        });
      }
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize PostHog only on client side
    if (typeof window !== "undefined") {
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      const posthogHost =
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

      if (posthogKey) {
        posthog.init(posthogKey, {
          api_host: posthogHost,
          loaded: (posthog) => {
            if (process.env.NODE_ENV === "development") {
              posthog.debug(); // Enable debug mode in development
            }
          },
          // Capture pageviews automatically
          capture_pageview: true,
          // Capture pageleave events
          capture_pageleave: true,
          // Save referrer for SEO analysis
          save_referrer: true,
        });
      }
    }
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </>
  );
}
