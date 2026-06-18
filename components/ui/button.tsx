import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Heart Aerospace: outlined ghost only — Jetstream Blue border, no fill
        default:
          "border-[1.5px] border-jetstream-blue bg-transparent text-onyx hover:bg-jetstream-blue hover:text-cloud",
        destructive:
          "border-[1.5px] border-red-600 bg-transparent text-red-600 hover:bg-red-600 hover:text-white",
        outline:
          "border-[1.5px] border-onyx bg-transparent text-onyx hover:bg-onyx hover:text-cloud",
        secondary:
          "border-[1.5px] border-stratosphere bg-transparent text-onyx hover:bg-stratosphere hover:text-cloud",
        ghost:
          "bg-transparent text-onyx hover:bg-stratosphere-10 border-0",
        link: "text-jetstream-blue underline-offset-4 hover:underline border-0 bg-transparent p-0",
      },
      size: {
        default: "h-9 px-6 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-11 px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
