import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getAllLessons, getSections } from "@/lib/content";
import { PageShell, SiteHeader, SiteFooter } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function HomePage() {
  const lessons = getAllLessons();
  const sections = getSections();
  const firstLesson = lessons[0];

  return (
    <TooltipProvider>
      <PageShell>
        <SiteHeader
          variant="hero"
          firstLessonSlug={firstLesson?.slug ?? null}
        />

        <section className="relative min-h-screen flex flex-col justify-end bg-atmospheric">
          <div className="px-6 md:px-10 pb-20 pt-36">
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
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-cloud text-cloud hover:bg-cloud hover:text-onyx"
                >
                  <Link href={`/curso/${firstLesson.slug}`}>
                    Comenzar el curso
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              <Link
                href="/autor"
                className="inline-flex items-center gap-2 text-cloud/70 text-sm font-sans hover:text-cloud transition-colors duration-150"
              >
                Editor de contenido
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-14 pt-8 border-t border-cloud/20 flex flex-wrap items-center gap-x-10 gap-y-3">
              <div>
                <p className="text-cloud text-lg font-semibold font-mono">
                  {lessons.length}
                </p>
                <p className="text-cloud/60 text-xs font-mono tracking-wide">
                  LECCIONES
                </p>
              </div>
              <div className="h-8 w-px bg-cloud/20" />
              <div>
                <p className="text-cloud text-lg font-semibold font-mono">
                  {sections.length}
                </p>
                <p className="text-cloud/60 text-xs font-mono tracking-wide">
                  SECCIONES
                </p>
              </div>
              <div className="h-8 w-px bg-cloud/20" />
              <div>
                <p className="text-cloud text-lg font-semibold font-mono">MDX</p>
                <p className="text-cloud/60 text-xs font-mono tracking-wide">
                  FORMATO
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contenido" className="bg-cloud px-6 md:px-10 py-20 scroll-mt-20">
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
                          <p className="font-sans font-semibold text-onyx group-hover:text-jetstream-blue transition-colors duration-150">
                            {lesson.title}
                          </p>
                          <p className="text-sm text-onyx/50">
                            {lesson.description}
                          </p>
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

        <section className="bg-gray-50 border-t border-onyx/10 px-6 md:px-10 py-16">
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
                className={`p-6 ${i < 3 ? "sm:border-r border-onyx/20" : ""}`}
              >
                <h3 className="font-mono font-semibold text-onyx text-sm tracking-wide mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-onyx/60 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <SiteFooter />
      </PageShell>
    </TooltipProvider>
  );
}
