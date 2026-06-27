import { cn } from "@/lib/utils";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div
      className={cn("min-h-screen bg-cloud text-onyx font-sans", className)}
    >
      {children}
    </div>
  );
}
