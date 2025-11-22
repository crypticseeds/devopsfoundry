'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface LLMCopyButtonProps {
  markdownUrl: string;
}

export function LLMCopyButton({ markdownUrl }: LLMCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const response = await fetch(markdownUrl);
      
      if (!response.ok) {
        console.error('Failed to fetch markdown:', response.status, response.statusText);
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && !contentType.includes('text/markdown') && !contentType.includes('text/plain')) {
        console.warn('Unexpected content type:', contentType);
      }
      
      const text = await response.text();
      
      if (text.includes('<!DOCTYPE html>')) {
        console.error('Received HTML instead of markdown. URL:', markdownUrl);
        throw new Error('Received HTML instead of markdown');
      }
      
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy markdown. Check console for details.');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border border-secondary/20 bg-background hover:bg-secondary/10 transition-colors"
      title="Copy Markdown"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy Markdown
        </>
      )}
    </button>
  );
}

