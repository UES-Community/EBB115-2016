import type { ReactNode } from "react";
import { Info, Lightbulb, AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "tip" | "warning" | "danger";

const styles: Record<
  CalloutType,
  { bg: string; border: string; icon: ReactNode; label: string }
> = {
  info: {
    bg: "bg-callout-info",
    border: "border-callout-info-border",
    icon: <Info className="h-5 w-5 text-jetstream-blue" />,
    label: "NOTA",
  },
  tip: {
    bg: "bg-callout-tip",
    border: "border-callout-tip-border",
    icon: <Lightbulb className="h-5 w-5 text-stratosphere" />,
    label: "CONSEJO",
  },
  warning: {
    bg: "bg-callout-warning",
    border: "border-callout-warning-border",
    icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
    label: "ADVERTENCIA",
  },
  danger: {
    bg: "bg-callout-danger",
    border: "border-callout-danger-border",
    icon: <AlertCircle className="h-5 w-5 text-red-600" />,
    label: "ATENCIÓN",
  },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const style = styles[type];

  return (
    <div
      className={cn(
        "my-6 flex gap-3 border-l-4 p-4 not-prose",
        style.bg,
        style.border
      )}
      role="note"
    >
      <div className="mt-0.5 shrink-0">{style.icon}</div>
      <div className="min-w-0 flex-1">
        {(title || style.label) && (
          <p className="mb-1 text-xs font-semibold text-onyx tracking-widest uppercase">
            {title ?? style.label}
          </p>
        )}
        <div className="text-sm leading-relaxed text-onyx/80">{children}</div>
      </div>
    </div>
  );
}
