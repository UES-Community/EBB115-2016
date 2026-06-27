import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EBB115-2016 — Documentación",
    template: "%s | EBB115-2016",
  },
  description:
    "Documentación oficial de la materia EBB115-2016. Contenido estructurado, ejemplos de código y recursos de aprendizaje.",
  keywords: ["EBB115", "2016", "documentación", "curso", "UES"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:block focus:w-auto focus:h-auto focus:overflow-visible focus:whitespace-normal focus:border-[1.5px] focus:border-jetstream-blue focus:bg-cloud focus:px-4 focus:py-2 focus:text-sm focus:text-onyx"
        >
          Saltar al contenido
        </a>
        <Toaster>{children}</Toaster>
      </body>
    </html>
  );
}
