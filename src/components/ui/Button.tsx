"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand-purple text-white shadow-md hover:bg-[#5b3eb0] focus-visible:ring-brand-purple",
  secondary:
    "border-2 border-brand-purple bg-transparent text-brand-purple hover:bg-brand-purple/10 focus-visible:ring-brand-purple",
  danger:
    "bg-brand-coral text-white shadow-md hover:bg-[#e04f4f] focus-visible:ring-brand-coral",
  ghost:
    "bg-transparent text-brand-purple hover:bg-brand-purple/10 focus-visible:ring-brand-purple",
};

const sizes = {
  sm: "min-h-[2.25rem] px-3 py-1.5 text-sm",
  md: "min-h-[2.75rem] px-4 py-2 text-base",
  lg: "min-h-[3.25rem] px-6 py-2.5 text-lg",
};

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) {
    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-body font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <span
            className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden
          />
        ) : null}
        <span>{children}</span>
      </motion.button>
    );
  }
);
