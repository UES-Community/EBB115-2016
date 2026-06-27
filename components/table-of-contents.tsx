"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/content";

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
  enableScrollSpy?: boolean;
  onLinkClick?: () => void;
}

export function TableOfContents({
  items,
  className,
  enableScrollSpy = false,
  onLinkClick,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!enableScrollSpy || items.length === 0) return;

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enableScrollSpy, items]);

  if (items.length === 0) return null;

  return (
    <nav className={className} aria-label="Tabla de contenidos">
      <p className="mb-4 text-[10px] font-sans font-semibold tracking-widest text-stratosphere uppercase">
        En esta página
      </p>
      <ul className="space-y-2 text-xs font-sans">
        {items.map((item) => {
          const isActive = enableScrollSpy && activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={onLinkClick}
                className={cn(
                  "block py-0.5 transition-colors duration-150",
                  item.level === 3 && "pl-4",
                  isActive
                    ? "border-l-2 border-jetstream-blue pl-2 -ml-0.5 text-jetstream-blue font-semibold"
                    : "text-onyx/60 hover:text-jetstream-blue"
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
