"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageShell, SiteHeader } from "@/components/layout";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageShell>
      <SiteHeader variant="docs" title="Error" />
      <div className="flex flex-col items-start justify-center px-6 md:px-10 py-20 max-w-lg">
        <p className="text-xs font-mono tracking-widest text-stratosphere uppercase mb-6">
          Error
        </p>
        <h1
          className="font-display font-semibold text-onyx mb-4"
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Algo salió mal
        </h1>
        <p className="text-onyx/60 text-base mb-8 leading-relaxed">
          Ocurrió un error inesperado al cargar esta página. Puedes intentar de
          nuevo o volver al inicio.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={reset}>Intentar de nuevo</Button>
          <Button variant="outline" asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
