"use client";

import * as React from "react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { Callout } from "@/components/mdx/Callout";
import { Sandbox } from "@/components/mdx/Sandbox";
import { References, ReferenceItem } from "@/components/mdx/Reference";
import { InlineCode } from "@/components/mdx/CodeBlock";
import { Skeleton } from "@/components/ui/skeleton";

const previewComponents = {
  Callout,
  Sandbox,
  References,
  ReferenceItem,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-4 overflow-x-auto border border-onyx/20 bg-gray-50 p-4 text-xs font-mono"
      {...props}
    />
  ),
  code: InlineCode,
};

interface MdxPreviewProps {
  markdown: string;
}

export function MdxPreview({ markdown }: MdxPreviewProps) {
  const [source, setSource] = React.useState<MDXRemoteSerializeResult | null>(
    null
  );
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    serialize(markdown, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    })
      .then((result) => {
        if (!cancelled) {
          setSource(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setSource(null);
          setError(
            err instanceof Error ? err.message : "Error al renderizar vista previa"
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [markdown]);

  if (error) {
    return (
      <div className="border border-callout-danger-border bg-callout-danger p-4 text-sm text-onyx">
        {error}
      </div>
    );
  }

  if (!source) {
    return (
      <div className="space-y-3 border border-onyx/20 bg-white p-6 min-h-[420px]">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  return (
    <div className="prose-course border border-onyx/20 bg-white p-6 min-h-[420px] overflow-auto">
      <MDXRemote {...source} components={previewComponents} />
    </div>
  );
}
