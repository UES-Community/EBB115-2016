"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { Sidebar } from "@/components/sidebar";
import { TableOfContents } from "@/components/table-of-contents";
import { CollapsibleSection } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useLessonProgress } from "@/hooks/use-lesson-progress";
import type { SectionMeta, TocItem, LessonMeta } from "@/lib/content";

interface DocsLayoutProps {
  children: React.ReactNode;
  slug: string;
  sections: SectionMeta[];
  toc: TocItem[];
  title: string;
  description?: string;
  lessonPosition: { current: number; total: number };
  progress: number;
  prev: LessonMeta | null;
  next: LessonMeta | null;
}

export function DocsLayout({
  children,
  slug,
  sections,
  toc,
  title,
  description,
  lessonPosition,
  progress,
  prev,
  next,
}: DocsLayoutProps) {
  const [tocOpen, setTocOpen] = React.useState(false);
  const { isCompleted, toggleCompleted } = useLessonProgress(
    slug,
    lessonPosition.total
  );

  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col bg-cloud text-onyx font-sans">
        <SiteHeader
          variant="docs"
          title={title}
          lessonPosition={lessonPosition}
          progress={progress}
          sections={sections}
        />

        <div className="flex flex-1">
          <Sidebar sections={sections} className="hidden lg:flex" />

          <main id="main-content" className="flex flex-1 overflow-hidden">
            <div className="flex flex-1 flex-col overflow-y-auto">
              {/* Mobile TOC trigger */}
              {toc.length > 0 && (
                <div className="lg:hidden border-b border-onyx/20 px-6 py-3">
                  <Dialog open={tocOpen} onOpenChange={setTocOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start gap-2 font-mono text-xs"
                      >
                        <List className="h-4 w-4" />
                        En esta página
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm bg-cloud border-onyx/20">
                      <DialogHeader>
                        <DialogTitle className="text-sm font-mono tracking-widest uppercase text-stratosphere">
                          En esta página
                        </DialogTitle>
                      </DialogHeader>
                      <TableOfContents
                        items={toc}
                        onLinkClick={() => setTocOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              )}

              <article className="mx-auto w-full max-w-3xl flex-1 px-6 md:px-8 py-10">
                <header className="mb-10 space-y-3 border-b border-onyx/20 pb-8">
                  <p className="text-xs font-mono tracking-widest text-stratosphere uppercase">
                    EBB115-2016 · Lección {lessonPosition.current} de{" "}
                    {lessonPosition.total}
                  </p>
                  <h1
                    className="font-display font-semibold text-onyx leading-tight text-heading-sm"
                    style={{
                      fontSize: "clamp(28px, 4vw, 46px)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {title}
                  </h1>
                  {description && (
                    <p className="text-base text-onyx/60 leading-relaxed max-w-xl">
                      {description}
                    </p>
                  )}
                </header>

                {/* Inline collapsible TOC for tablet */}
                {toc.length > 0 && (
                  <div className="lg:hidden mb-8">
                    <CollapsibleSection title="Contenido de esta página" defaultOpen={false}>
                      <TableOfContents items={toc} className="pt-2" />
                    </CollapsibleSection>
                  </div>
                )}

                <div className="prose-course">{children}</div>

                <div className="mt-10 flex justify-end">
                  <Button
                    variant={isCompleted ? "secondary" : "default"}
                    size="sm"
                    onClick={toggleCompleted}
                    className="font-mono text-xs"
                  >
                    {isCompleted
                      ? "Marcada como completada"
                      : "Marcar como completada"}
                  </Button>
                </div>

                <Separator className="my-10" />

                <nav
                  className="grid gap-px sm:grid-cols-2 border border-onyx/20"
                  aria-label="Navegación entre lecciones"
                >
                  {prev ? (
                    <Link
                      href={`/curso/${prev.slug}`}
                      className="group flex items-center gap-3 bg-cloud p-5 hover:bg-gray-50 transition-colors duration-150 border-r border-onyx/10"
                    >
                      <ChevronLeft className="h-5 w-5 text-stratosphere group-hover:text-jetstream-blue transition-colors shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-mono text-stratosphere uppercase tracking-wider">
                          Anterior
                        </p>
                        <p className="text-sm font-semibold text-onyx group-hover:text-jetstream-blue transition-colors truncate">
                          {prev.title}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      href="/"
                      className="group flex items-center gap-3 bg-cloud p-5 hover:bg-gray-50 transition-colors duration-150 border-r border-onyx/10"
                    >
                      <ChevronLeft className="h-5 w-5 text-stratosphere group-hover:text-jetstream-blue transition-colors shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-mono text-stratosphere uppercase tracking-wider">
                          Inicio del curso
                        </p>
                        <p className="text-sm font-semibold text-onyx group-hover:text-jetstream-blue transition-colors">
                          Volver al índice
                        </p>
                      </div>
                    </Link>
                  )}
                  {next ? (
                    <Link
                      href={`/curso/${next.slug}`}
                      className="group flex items-center justify-between gap-3 bg-cloud p-5 hover:bg-gray-50 transition-colors duration-150 text-right"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-mono text-stratosphere uppercase tracking-wider">
                          Siguiente
                        </p>
                        <p className="text-sm font-semibold text-onyx group-hover:text-jetstream-blue transition-colors truncate">
                          {next.title}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-stratosphere group-hover:text-jetstream-blue transition-colors shrink-0" />
                    </Link>
                  ) : (
                    <Link
                      href="/#contenido"
                      className="group flex items-center justify-between gap-3 bg-cloud p-5 hover:bg-gray-50 transition-colors duration-150 text-right"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-mono text-stratosphere uppercase tracking-wider">
                          Fin del curso
                        </p>
                        <p className="text-sm font-semibold text-onyx group-hover:text-jetstream-blue transition-colors">
                          Ver índice completo
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-stratosphere group-hover:text-jetstream-blue transition-colors shrink-0" />
                    </Link>
                  )}
                </nav>
              </article>
            </div>

            <aside className="hidden lg:block w-60 shrink-0 border-l border-onyx/20 p-6 bg-cloud overflow-y-auto">
              <TableOfContents items={toc} enableScrollSpy />
            </aside>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
