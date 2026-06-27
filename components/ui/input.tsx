import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full border border-onyx/20 bg-white px-3 py-2 text-sm text-onyx transition-colors",
        "placeholder:text-onyx/40",
        "focus-visible:border-jetstream-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jetstream-blue/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
