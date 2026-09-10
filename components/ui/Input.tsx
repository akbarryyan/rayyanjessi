"use client";

import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { controlClassName, describedBy, useField } from "./Field";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...rest }: InputProps) {
  const field = useField();
  return (
    <input
      {...rest}
      id={field.inputId}
      aria-invalid={field.hasError || undefined}
      aria-describedby={describedBy(field)}
      className={cn(
        controlClassName,
        field.hasError ? "border-critical" : "border-line-strong",
        className,
      )}
    />
  );
}
