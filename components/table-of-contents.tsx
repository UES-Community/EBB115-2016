"use client";

import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/content";

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      className={cn("hidden xl:block", className)}
      aria-label="Tabla de contenidos"
    >
      <p className="mb-4 text-[10px] font-sans font-semibold tracking-widest text-stratosphere uppercase">
        En esta página
      </p>
      <ul className="space-y-2 text-xs font-sans">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block text-onyx/50 transition-colors hover:text-jetstream-blue",
                item.level === 3 && "pl-4"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
