import Link from "next/link";
import { BookOpen } from "lucide-react";

export function SiteFooter() {
  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Contenido", href: "/#contenido" },
    { label: "Editor", href: "/autor" },
  ];

  return (
    <footer className="bg-onyx px-10 py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <div>
          <p className="text-cloud text-sm font-semibold mb-4 tracking-wide">
            Navegación
          </p>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-cloud/60 text-sm hover:text-cloud transition-colors duration-150"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-cloud text-sm font-semibold mb-4 tracking-wide">
            Tecnología
          </p>
          <ul className="space-y-2">
            {["Next.js 15", "Tailwind CSS v4", "Radix UI", "MDX Remote", "Shiki"].map(
              (t) => (
                <li key={t} className="text-cloud/60 text-sm">
                  {t}
                </li>
              )
            )}
          </ul>
        </div>

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
  );
}
