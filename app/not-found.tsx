import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-start justify-center px-10 bg-cloud">
      <p className="text-xs font-mono tracking-widest text-stratosphere uppercase mb-6">
        Error
      </p>
      <h1
        className="font-display font-semibold text-onyx mb-4"
        style={{
          fontSize: "clamp(64px, 12vw, 156px)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        404
      </h1>
      <p className="text-onyx/60 text-lg mb-8 max-w-md">
        La lección o página que buscas no existe o fue movida.
      </p>
      <Button asChild>
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
