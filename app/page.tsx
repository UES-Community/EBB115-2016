import Link from "next/link";
import { BookOpen, ArrowRight, ChevronRight } from "lucide-react";
import { getAllLessons, getSections } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function HomePage() {
  const lessons = getAllLessons();
  const sections = getSections();
  const firstLesson = lessons[0];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-cloud text-onyx font-sans">

        {/* ── Transparent Hero Navigation ── */}
        <header
          className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6"
          style={{ background: "transparent" }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-cloud" />
            <span className="font-sans text-sm font-semibold text-cloud tracking-wide">
              EBB115-2016
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-7">
            {[
              { label: "Inicio", href: "/" },
              { label: "Contenido", href: firstLesson ? `/curso/${firstLesson.slug}` : "#" },
              { label: "Editor", href: "/autor" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-cloud text-sm font-sans hover:opacity-70 transition-opacity"
                style={{ letterSpacing: "-0.01em" }}
              >
                {link.label}
              </Link>
            ))}
            {firstLesson && (
              <Link
                href={`/curso/${firstLesson.slug}`}
                className="border-[1.5px] border-cloud text-cloud text-sm font-sans px-5 py-2 hover:bg-cloud hover:text-onyx transition-all"
                style={{ letterSpacing: "-0.01em" }}
              >
                Comenzar
              </Link>
            )}
          </nav>
        </header>

        {/* ── Full-Bleed Atmospheric Hero ── */}
        <section
          className="relative min-h-screen flex flex-col justify-end"
          style={{
            background:
              "linear-gradient(to bottom, #716e85 0%, rgba(113,110,133,0.75) 45%, #ffffff 100%)",
          }}
        >
          {/* Headline anchored bottom-left */}
          <div className="px-10 pb-20 pt-36">
            <p className="text-xs font-mono tracking-widest text-cloud/70 uppercase mb-6">
              Universidad de El Salvador · EBB115 · 2016
            </p>

            <h1
              className="font-display font-semibold text-cloud"
              style={{
                fontSize: "clamp(48px, 9vw, 140px)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                maxWidth: "90vw",
              }}
            >
              Documentación
              <br />
              <span style={{ color: "rgba(255,255,255,0.7)" }}>
                EBB115-2016
              </span>
            </h1>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {firstLesson && (
                <Link
                  href={`/curso/${firstLesson.slug}`}
                  className="inline-flex items-center gap-2 border-[1.5px] border-cloud text-cloud text-sm font-sans px-6 py-3 hover:bg-cloud hover:text-onyx transition-all"
                >
                  Comenzar el curso
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
              <Link
                href="/autor"
                className="inline-flex items-center gap-2 text-cloud/70 text-sm font-sans hover:text-cloud transition-colors"
              >
                Editor de contenido
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Stats bar */}
            <div className="mt-14 pt-8 border-t border-cloud/20 flex flex-wrap items-center gap-x-10 gap-y-3">
              <div>
                <p className="text-cloud text-lg font-semibold font-mono">{lessons.length}</p>
                <p className="text-cloud/60 text-xs font-mono tracking-wide">LECCIONES</p>
              </div>
              <div className="h-8 w-px bg-cloud/20" />
              <div>
                <p className="text-cloud text-lg font-semibold font-mono">{sections.length}</p>
                <p className="text-cloud/60 text-xs font-mono tracking-wide">SECCIONES</p>
              </div>
              <div className="h-8 w-px bg-cloud/20" />
              <div>
                <p className="text-cloud text-lg font-semibold font-mono">MDX</p>
                <p className="text-cloud/60 text-xs font-mono tracking-wide">FORMATO</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cloud Canvas: Course Content ── */}
        <section className="bg-cloud px-10 py-20">
          {/* Section headline — 46px, left-anchored */}
          <h2
            className="font-display font-semibold text-onyx mb-12 border-b border-onyx pb-6"
            style={{
              fontSize: "clamp(28px, 4vw, 46px)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            Contenido del curso
          </h2>

          <div className="space-y-16">
            {sections.map((section) => (
              <div key={section.id}>
                <p className="text-xs font-mono tracking-widest text-stratosphere uppercase mb-4">
                  {section.title}
                </p>
                <ul className="divide-y divide-onyx/10 border-t border-onyx/10">
                  {section.lessons.map((lesson) => (
                    <li key={lesson.slug}>
                      <Link
                        href={`/curso/${lesson.slug}`}
                        className="flex items-center justify-between py-5 group hover:pl-2 transition-all duration-150"
                      >
                        <div className="space-y-1">
                          <p className="font-sans font-semibold text-onyx group-hover:text-jetstream-blue transition-colors">
                            {lesson.title}
                          </p>
                          <p className="text-sm text-onyx/50">{lesson.description}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-stratosphere group-hover:text-jetstream-blue group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                      </Link>
                    </li>
                  ))}
                  {section.lessons.length === 0 && (
                    <li className="py-5 text-sm text-onyx/40 font-mono">
                      — Sin lecciones disponibles aún
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features band (cloud canvas) ── */}
        <section className="bg-gray-50 border-t border-onyx/10 px-10 py-16">
          <h2
            className="font-display font-semibold text-onyx mb-10"
            style={{
              fontSize: "clamp(22px, 3vw, 36px)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            Tecnologías integradas
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-onyx/20">
            {[
              {
                title: "MDX",
                desc: "Contenido enriquecido con componentes React embebidos en Markdown.",
              },
              {
                title: "Radix UI",
                desc: "Componentes accesibles: dialogs, tooltips, acordeones, pestañas y más.",
              },
              {
                title: "Shiki",
                desc: "Resaltado de sintaxis de precisión IDE con el tema GitHub Light.",
              },
              {
                title: "Sandpack",
                desc: "Sandboxes interactivos para ejecutar código directamente en el navegador.",
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className={`p-6 ${i < 3 ? "border-r border-onyx/20" : ""}`}
              >
                <h3 className="font-mono font-semibold text-onyx text-sm tracking-wide mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-onyx/60 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Onyx Footer ── */}
        <footer className="bg-onyx px-10 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Navigation */}
            <div>
              <p className="text-cloud text-sm font-semibold mb-4 tracking-wide">
                Navegación
              </p>
              <ul className="space-y-2">
                {[
                  { label: "Inicio", href: "/" },
                  { label: "Contenido", href: firstLesson ? `/curso/${firstLesson.slug}` : "#" },
                  { label: "Editor", href: "/autor" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-cloud/60 text-sm hover:text-cloud transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tecnología */}
            <div>
              <p className="text-cloud text-sm font-semibold mb-4 tracking-wide">
                Tecnología
              </p>
              <ul className="space-y-2">
                {["Next.js 15", "Tailwind CSS v4", "Radix UI", "MDX Remote", "Shiki"].map((t) => (
                  <li key={t} className="text-cloud/60 text-sm">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Institución */}
            <div>
              <p className="text-cloud text-sm font-semibold mb-4 tracking-wide">
                Institución
              </p>
              <address className="not-italic text-cloud/60 text-sm space-y-1">
                <p>Universidad de El Salvador</p>
                <p>Materia: EBB115-2016</p>
                <p className="mt-3 text-cloud/40 text-xs font-mono">
                  Powered by Antigravity
                </p>
              </address>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-cloud/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-cloud/40" />
              <span className="text-cloud/40 text-xs font-mono">EBB115-2016</span>
            </div>
            <p className="text-cloud/30 text-xs font-mono">
              © {new Date().getFullYear()} · Universidad de El Salvador
            </p>
          </div>
        </footer>

      </div>
    </TooltipProvider>
  );
}
