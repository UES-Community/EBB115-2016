"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sidebar } from "@/components/sidebar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { SectionMeta } from "@/lib/content";

export interface SiteHeaderProps {
  variant: "hero" | "docs" | "minimal";
  firstLessonSlug?: string | null;
  /** Docs variant */
  title?: string;
  lessonPosition?: { current: number; total: number };
  progress?: number;
  sections?: SectionMeta[];
  /** Minimal variant */
  minimalTitle?: string;
  className?: string;
}

const heroNavLinks = (firstLessonSlug?: string | null) => [
  { label: "Inicio", href: "/" },
  { label: "Contenido", href: "/#contenido" },
  { label: "Editor", href: "/autor" },
  ...(firstLessonSlug
    ? [{ label: "Comenzar", href: `/curso/${firstLessonSlug}`, cta: true }]
    : []),
];

function MobileNavDialog({
  links,
  variant,
  sections,
  onNavigate,
}: {
  links: { label: string; href: string; cta?: boolean }[];
  variant: "hero" | "docs";
  sections?: SectionMeta[];
  onNavigate?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const handleNavigate = () => {
    setOpen(false);
    onNavigate?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(variant === "hero" && "text-cloud hover:bg-cloud/10")}
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm overflow-hidden p-0 bg-cloud border-onyx/20">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-sm font-mono tracking-widest uppercase text-stratosphere">
            Navegación
          </DialogTitle>
        </DialogHeader>
        {variant === "docs" && sections ? (
          <Sidebar
            sections={sections}
            className="w-full border-0 border-t border-onyx/20"
            onLinkClick={handleNavigate}
          />
        ) : (
          <nav className="flex flex-col border-t border-onyx/20">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={handleNavigate}
                className={cn(
                  "px-6 py-4 text-sm border-b border-onyx/10 transition-colors duration-150",
                  link.cta
                    ? "font-semibold text-jetstream-blue hover:bg-jetstream-10"
                    : "text-onyx hover:bg-gray-50 hover:text-jetstream-blue",
                  pathname === link.href && "bg-jetstream-10 text-jetstream-blue"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function SiteHeader({
  variant,
  firstLessonSlug,
  title,
  lessonPosition,
  progress = 0,
  sections,
  minimalTitle = "Editor de Lecciones",
  className,
}: SiteHeaderProps) {
  const links = heroNavLinks(firstLessonSlug);

  if (variant === "hero") {
    return (
      <header
        className={cn(
          "absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-6",
          className
        )}
      >
        <Link href="/" className="flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-cloud" />
          <span className="font-sans text-sm font-semibold text-cloud tracking-wide">
            EBB115-2016
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links
            .filter((l) => !l.cta)
            .map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-cloud text-sm font-sans hover:opacity-70 transition-opacity duration-150"
                style={{ letterSpacing: "-0.01em" }}
              >
                {link.label}
              </Link>
            ))}
          {firstLessonSlug && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-cloud text-cloud hover:bg-cloud hover:text-onyx"
            >
              <Link href={`/curso/${firstLessonSlug}`}>Comenzar</Link>
            </Button>
          )}
        </nav>

        <div className="md:hidden">
          <MobileNavDialog links={links} variant="hero" />
        </div>
      </header>
    );
  }

  if (variant === "minimal") {
    return (
      <header
        className={cn(
          "border-b border-onyx/20 bg-cloud sticky top-0 z-50",
          className
        )}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Inicio
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-jetstream-blue" />
            <h1 className="font-mono text-sm font-semibold tracking-wide text-onyx select-none">
              {minimalTitle}
              <span className="text-stratosphere font-normal hidden sm:inline">
                {" "}
                · EBB115-2016
              </span>
            </h1>
          </div>
          <div className="w-20 sm:w-24" />
        </div>
      </header>
    );
  }

  // docs variant
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-onyx/20 bg-cloud/95 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex h-14 items-center gap-4 px-6">
        <div className="lg:hidden">
          <MobileNavDialog
            links={links}
            variant="docs"
            sections={sections}
          />
        </div>

        <div className="flex flex-1 items-center justify-between min-w-0">
          {/* Breadcrumbs — full on lg, compact on mobile */}
          <div className="flex items-center gap-2 font-mono text-xs text-stratosphere min-w-0">
            <Link
              href="/"
              className="hover:text-jetstream-blue transition-colors duration-150 shrink-0"
            >
              <span className="lg:hidden">EBB115</span>
              <span className="hidden lg:inline">EBB115-2016</span>
            </Link>
            <span className="text-onyx/30 shrink-0">/</span>
            <span className="text-onyx font-medium truncate">{title}</span>
          </div>

          <div className="ml-auto flex items-center gap-4 sm:gap-6 shrink-0">
            {lessonPosition && (
              <div
                className="hidden items-center gap-3 sm:flex"
                title="Basado en tu posición en el curso"
              >
                <span className="text-xs font-mono text-stratosphere whitespace-nowrap">
                  Lección {lessonPosition.current} de {lessonPosition.total}
                </span>
                <Progress value={progress} className="w-20 lg:w-24" />
              </div>
            )}

            <Separator
              orientation="vertical"
              className="h-4 hidden sm:block"
            />

            <Link
              href="/autor"
              className="text-xs font-mono text-stratosphere hover:text-jetstream-blue transition-colors duration-150"
            >
              Editor
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
