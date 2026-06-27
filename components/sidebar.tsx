"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { SectionMeta } from "@/lib/content";

interface SidebarProps {
  sections: SectionMeta[];
  className?: string;
  onLinkClick?: () => void;
}

export function Sidebar({ sections, className, onLinkClick }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex w-64 shrink-0 flex-col border-r border-onyx/20 bg-cloud",
        className
      )}
      aria-label="Navegación del curso"
    >
      {/* Logo row */}
      <div className="flex items-center gap-2 border-b border-onyx/20 px-6 py-4">
        <BookOpen className="h-4 w-4 text-jetstream-blue" />
        <Link
          href="/"
          className="font-sans text-sm font-semibold tracking-tight text-onyx hover:text-jetstream-blue transition-colors"
        >
          EBB115-2016
        </Link>
      </div>

      <ScrollArea className="flex-1 px-4 py-4">
        <nav className="space-y-6">
          {sections.map((section) => (
            <CollapsibleSection
              key={section.id}
              title={section.title}
              defaultOpen
            >
              <div className="space-y-0.5 mt-1">
                {section.lessons.map((lesson) => {
                  const href = `/curso/${lesson.slug}`;
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={lesson.slug}
                      href={href}
                      onClick={onLinkClick}
                      className={cn(
                        "block px-3 py-1.5 text-xs font-sans transition-all duration-150",
                        isActive
                          ? "border-l-2 border-jetstream-blue text-jetstream-blue font-semibold pl-2 bg-jetstream-10"
                          : "text-onyx/60 hover:text-onyx hover:bg-gray-50"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {lesson.title}
                    </Link>
                  );
                })}
              </div>
            </CollapsibleSection>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
