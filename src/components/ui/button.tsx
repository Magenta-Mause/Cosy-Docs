import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-['VT323'] font-medium text-lg",
    "whitespace-nowrap transition-all",
    "gap-2",
    "rounded-md",
    "shrink-0",

    // SVG handling
    "[&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",

    // Validation
    "aria-invalid:border-destructive",
    "aria-invalid:ring-2 aria-invalid:ring-destructive/20",

    // Base colors
    "text-primary-modal-background",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-button-primary-default text-button-secondary-default",
          "shadow-md shadow-button-drop-shadow",

          "hover:bg-button-primary-hover",

          "active:bg-button-primary-click",
          "active:shadow-[inset_0_0.25rem_0.5rem_0_var(--color-button-primary-inner-shadow)]",
          "active:shadow-none",

          "border border-button-secondary-border",
          "disabled:bg-button-primary-disabled",
          "disabled:text-button-secondary-disabled",
          "disabled:border-button-secondary-disabled-border",

          "focus-visible:ring-2 focus-visible:ring-button-primary-hover",
        ].join(" "),

        secondary: [
          "bg-button-secondary-default",
          "text-button-primary-click",
          "border border-button-secondary-border",
          "shadow-md shadow-button-drop-shadow",

          "hover:bg-button-secondary-hover",

          "active:bg-button-secondary-click",
          "active:shadow-[inset_0_0.25rem_0.3125rem_0_var(--color-button-drop-shadow)]",
          "active:shadow-none",

          "disabled:bg-button-secondary-disabled",
          "disabled:border-button-secondary-disabled-border",
          "disabled:text-button-secondary-disabled-border",

          "focus-visible:ring-2 focus-visible:ring-button-primary-hover",
        ].join(" "),

        destructive: [
          "bg-button-destructive-default",
          "text-button-destructive-text",
          "shadow-md shadow-button-drop-shadow",

          "hover:bg-button-destructive-hover",

          "active:bg-button-destructive-click",
          "active:shadow-[inset_0_0.25rem_0.3125rem_0_var(--color-button-primary-inner-shadow)]",
          "active:shadow-none",

          "disabled:bg-button-destructive-disabled",
          "disabled:text-button-destructive-disabled-text",

          "focus-visible:ring-2 focus-visible:ring-button-destructive-click",
        ].join(" "),

        ghost: [
          "bg-transparent",
          "text-button-primary-click",

          "hover:bg-button-ghost-hover",

          "active:bg-button-ghost-click",

          "disabled:text-button-primary-default",

          "focus-visible:ring-2 focus-visible:ring-button-primary-hover",
        ].join(" "),
      },

      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 px-3 text-lg gap-1.5 rounded-sm has-[>svg]:px-2",
        lg: "h-12 px-6 text-xl gap-2 rounded-lg has-[>svg]:px-4",

        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        `${props.disabled ? "active:shadow-md" : ""}`,
      )}
      {...props}
    >
      {props.children}
    </Comp>
  );
}

export { Button, buttonVariants };
