"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { SiGithub, SiOpenai, SiAnthropic } from "react-icons/si";
import Link from "next/link";

interface ViewOptionsProps {
  markdownUrl: string;
  githubUrl?: string;
}

const getFullUrl = (relativePath: string): string => {
  if (typeof window !== "undefined") {
    return `${window.location.origin}${relativePath}`;
  }
  // Fallback for SSR - you can set this via environment variable
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://devopsfoundry.com";
  return `${baseUrl}${relativePath}`;
};

const AI_PLATFORMS = [
  {
    name: "GitHub",
    icon: <SiGithub className="h-5 w-5 shrink-0" />,
    getUrl: (githubUrl?: string) => githubUrl,
  },
  {
    name: "ChatGPT",
    icon: <SiOpenai className="h-5 w-5 shrink-0" />,
    getUrl: (_githubUrl?: string, markdownUrl?: string) => {
      if (!markdownUrl) return undefined;
      const fullUrl = getFullUrl(markdownUrl);
      const prompt = `Read ${fullUrl}, I want to ask questions about it.`;
      return `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`;
    },
  },
  {
    name: "Claude AI",
    icon: <SiAnthropic className="h-5 w-5 shrink-0" />,
    getUrl: (_githubUrl?: string, markdownUrl?: string) => {
      if (!markdownUrl) return undefined;
      const fullUrl = getFullUrl(markdownUrl);
      const prompt = `Read ${fullUrl}, I want to ask questions about it.`;
      return `https://claude.ai/new?content=${encodeURIComponent(prompt)}`;
    },
  },
];

export function ViewOptions({ markdownUrl, githubUrl }: ViewOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-secondary/20 bg-background hover:bg-secondary/10 transition-colors"
        title="Open in..."
      >
        Open
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-background border border-border z-50 overflow-hidden">
          <div className="py-1">
            {AI_PLATFORMS.map((platform) => {
              const url = platform.getUrl(githubUrl, markdownUrl);

              if (!url) return null;

              return (
                <Link
                  key={platform.name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-accent transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {platform.icon}
                    </div>
                    <span className="font-medium text-foreground">
                      Open in {platform.name}
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
