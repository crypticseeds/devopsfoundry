'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface LLMCopyButtonProps {
  markdownUrl: string;
}

export function LLMCopyButton({ markdownUrl }: LLMCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  // Fallback copy method for non-secure contexts
  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (!successful) throw new Error('execCommand failed');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fallback: Could not copy text: ', err);
      throw err;
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const handleCopy = async () => {
    try {
      const response = await fetch(markdownUrl);

      if (!response.ok) {
        console.error('Failed to fetch markdown:', response.status, response.statusText);
        throw new Error(`Failed to fetch markdown: ${response.status} ${response.statusText}`);
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

      // Try modern clipboard API first, fallback to execCommand
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Use fallback for non-secure contexts (non-HTTPS)
        fallbackCopyTextToClipboard(text);
      }
    } catch (error) {
      console.error('Failed to copy markdown:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to copy markdown: ${errorMessage}\n\nTip: Try accessing the site via localhost:3000 instead of the IP address for better clipboard support.`);
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

