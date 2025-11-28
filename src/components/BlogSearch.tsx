"use client";

import { Search } from "lucide-react";

interface BlogSearchProps {
  query: string;
  onSearchChange: (query: string) => void;
}

export function BlogSearch({ query, onSearchChange }: BlogSearchProps) {
  return (
    <div className="mx-auto max-w-2xl mb-12">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by keyword or tag..."
          value={query}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue"
        />
      </div>
    </div>
  );
}
