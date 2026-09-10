"use client";

import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { controlClassName, describedBy, useField } from "./Field";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, rows = 4, ...rest }: TextareaProps) {
  const field = useField();
  return (
    <textarea
      {...rest}
      rows={rows}
      id={field.inputId}
      aria-invalid={field.hasError || undefined}
      aria-describedby={describedBy(field)}
      className={cn(
        controlClassName,
        "resize-y leading-relaxed",
        field.hasError ? "border-critical" : "border-line-strong",
        className,
      )}
    />
  );
}
