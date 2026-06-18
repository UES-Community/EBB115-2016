"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { TableOfContents } from "@/components/table-of-contents";
import { NotesPanel } from "@/components/notes-panel";
import { Progress } from "@/components/ui/progress";
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
import type { SectionMeta, TocItem, LessonMeta } from "@/lib/content";

interface DocsLayoutProps {
  children: React.ReactNode;
  sections: SectionMeta[];
  toc: TocItem[];
  slug: string;
  title: string;
  description?: string;
  progress: number;
  prev: LessonMeta | null;
  next: LessonMeta | null;
}

export function DocsLayout({
  children,
  sections,
  toc,
  slug,
  title,
  description,
  progress,
  prev,
  next,
}: DocsLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col bg-cloud text-onyx font-sans">
        {/* Top Header */}
        <header className="sticky top-0 z-40 border-b border-onyx/20 bg-cloud/95 backdrop-blur-sm">
          <div className="flex h-14 items-center gap-4 px-6">
            <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Abrir menú"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="h-[80vh] max-w-sm overflow-hidden p-0 bg-cloud border-onyx/20">
                <DialogHeader className="sr-only">
                  <DialogTitle>Navegación del curso</DialogTitle>
                </DialogHeader>
                <Sidebar sections={sections} className="w-full border-0" />
              </DialogContent>
            </Dialog>

            <div className="flex flex-1 items-center justify-between">
              {/* Breadcrumbs */}
              <div className="hidden lg:flex items-center gap-2 font-mono text-xs text-stratosphere">
                <Link
                  href="/"
                  className="hover:text-jetstream-blue transition-colors"
                >
                  EBB115-2016
                </Link>
                <span className="text-onyx/30">/</span>
                <span className="text-onyx font-medium">{title}</span>
              </div>

              {/* Progress & Actions */}
              <div className="ml-auto flex items-center gap-6">
                <div className="hidden items-center gap-3 sm:flex">
                  <span className="text-xs font-mono text-stratosphere">
                    progreso:
                  </span>
                  <Progress value={progress} className="w-24" />
                  <span className="text-xs font-mono text-onyx font-semibold">
                    {progress}%
                  </span>
                </div>

                <Separator orientation="vertical" className="h-4 hidden sm:block" />

                <Link
                  href="/autor"
                  className="text-xs font-mono text-stratosphere hover:text-jetstream-blue transition-colors"
                >
                  Editor
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Layout */}
        <div className="flex flex-1">
          {/* Desktop Left Sidebar */}
          <Sidebar sections={sections} className="hidden lg:flex" />

          {/* Main Content Area */}
          <main className="flex flex-1 overflow-hidden">
            <div className="flex flex-1 flex-col overflow-y-auto">
              <article className="mx-auto w-full max-w-3xl flex-1 px-8 py-10">
                {/* Article header */}
                <header className="mb-10 space-y-3 border-b border-onyx/20 pb-8">
                  <p className="text-xs font-mono tracking-widest text-stratosphere uppercase">
                    EBB115-2016
                  </p>
                  <h1
                    className="font-display font-semibold text-onyx leading-tight"
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

                {/* MDX content */}
                <div className="prose-course">{children}</div>

                <Separator className="my-10" />

                {/* Lesson navigation */}
                <nav
                  className="grid gap-px sm:grid-cols-2 border border-onyx/20"
                  aria-label="Navegación entre lecciones"
                >
                  {prev ? (
                    <Link
                      href={`/curso/${prev.slug}`}
                      className="group flex items-center gap-3 bg-cloud p-5 hover:bg-gray-50 transition-all duration-150 border-r border-onyx/10"
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
                    <div className="border-r border-onyx/10" />
                  )}
                  {next ? (
                    <Link
                      href={`/curso/${next.slug}`}
                      className="group flex items-center justify-between gap-3 bg-cloud p-5 hover:bg-gray-50 transition-all duration-150 text-right"
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
                    <div />
                  )}
                </nav>
              </article>

              {/* Right TOC for XL screens */}
              <aside className="hidden w-60 shrink-0 border-l border-onyx/20 p-6 xl:block bg-cloud">
                <TableOfContents items={toc} />
              </aside>
            </div>

            {/* Desktop Notes Drawer */}
            <NotesPanel slug={slug} className="hidden md:flex border-l border-onyx/20" />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
