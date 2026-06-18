import React from "react";
import { highlightCode } from "@/lib/shiki";
import { CodeBlockClient } from "./CodeBlockClient";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  "data-line-numbers"?: string;
  [key: string]: unknown;
}

function parseMeta(className?: string) {
  const langMatch = className?.match(/language-(\w+)/);
  const lang = langMatch?.[1] ?? "text";

  const titleMatch = className?.match(/title="([^"]+)"/);
  const title = titleMatch?.[1];

  return { lang, title };
}

function extractCode(children: React.ReactNode): string {
  if (typeof children === "string") return children.trimEnd();
  if (Array.isArray(children)) {
    return children.map(extractCode).join("").trimEnd();
  }
  if (children && typeof children === "object" && "props" in children) {
    const el = children as React.ReactElement<{ children?: React.ReactNode }>;
    return extractCode(el.props.children);
  }
  return "";
}

export async function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const code = extractCode(children);
  const { lang, title: metaTitle } = parseMeta(className);
  const title = (props.title as string) ?? metaTitle;

  const html = await highlightCode(code, lang, "github-light");

  return (
    <CodeBlockClient html={html} rawCode={code} title={title} />
  );
}

export async function Pre({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement> & { children?: React.ReactNode }) {
  const child = React.Children.only(children) as React.ReactElement<{
    className?: string;
    children?: React.ReactNode;
  }>;

  if (child?.props?.className?.includes("language-")) {
    return (
      <CodeBlock className={child.props.className}>
        {child.props.children}
      </CodeBlock>
    );
  }

  return <pre {...props}>{children}</pre>;
}

export function InlineCode({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className="bg-gray-100 border border-onyx/20 px-1.5 py-0.5 font-mono text-xs text-jetstream-blue"
      {...props}
    >
      {children}
    </code>
  );
}
