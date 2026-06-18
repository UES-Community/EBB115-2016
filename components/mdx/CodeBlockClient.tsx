"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockClientProps {
  html: string;
  rawCode: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlockClient({
  html,
  rawCode,
  title,
  showLineNumbers = true,
}: CodeBlockClientProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 overflow-hidden border border-onyx/20 bg-gray-50">
      {/* Title bar */}
      {title && (
        <div className="flex items-center justify-between border-b border-onyx/20 bg-white px-4 py-2">
          <span className="text-xs font-mono text-stratosphere font-medium">{title}</span>
          <span className="text-[10px] font-mono text-onyx/30 tracking-widest uppercase">code</span>
        </div>
      )}
      {/* Code area */}
      <div className="relative">
        <button
          className={cn(
            "absolute right-3 top-3 z-10 flex items-center justify-center h-7 w-7 border border-onyx/20 bg-white text-stratosphere hover:text-onyx hover:border-onyx transition-all opacity-0 group-hover:opacity-100 active:scale-95"
          )}
          onClick={handleCopy}
          aria-label="Copiar código"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-jetstream-blue" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
        <div
          className={cn(
            "overflow-x-auto p-4 text-xs md:text-sm font-mono [&_pre]:!bg-transparent [&_pre]:!m-0 [&_code]:font-mono [&_code]:!text-[inherit]",
            showLineNumbers && "[&_.line]:inline-block [&_.line]:w-full"
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
