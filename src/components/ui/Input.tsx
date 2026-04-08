"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: string;
  label: string;
  error?: string;
  endAdornment?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      id,
      label,
      error,
      endAdornment,
      className,
      disabled,
      required,
      ...props
    },
    ref
  ) {
    const errorId = `${id}-error`;
    const describedBy = error ? errorId : props["aria-describedby"];

    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="mb-1.5 block font-body text-sm font-medium text-brand-dark"
        >
          {label}
          {required ? (
            <span className="text-brand-coral" aria-hidden>
              {" "}
              *
            </span>
          ) : null}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            required={required}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={describedBy}
            aria-required={required}
            className={cn(
              "w-full rounded-xl border-2 bg-white px-4 py-2.5 font-body text-brand-dark shadow-sm transition-shadow placeholder:text-brand-dark/40 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/35 disabled:cursor-not-allowed disabled:bg-brand-cream/80",
              endAdornment && "pr-12",
              error
                ? "border-brand-coral focus:border-brand-coral focus:ring-brand-coral/30"
                : "border-brand-dark/10",
              className
            )}
            {...props}
          />
          {endAdornment ? (
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center">
              {endAdornment}
            </div>
          ) : null}
        </div>
        {error ? (
          <p
            id={errorId}
            role="alert"
            className="mt-1.5 font-body text-sm text-brand-coral"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);
