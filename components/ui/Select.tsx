"use client";

import { Select as RadixSelect } from "radix-ui";
import { cn } from "@/lib/cn";
import { describedBy, useField } from "./Field";

export type SelectOption = { value: string; label: string };

export function Select({
  value,
  onValueChange,
  options,
  placeholder = "Pilih satu",
  disabled,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  options: readonly SelectOption[];
  placeholder?: string;
  disabled?: boolean;
}) {
  const field = useField();

  return (
    <RadixSelect.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <RadixSelect.Trigger
        id={field.inputId}
        aria-invalid={field.hasError || undefined}
        aria-describedby={describedBy(field)}
        className={cn(
          "flex min-h-12 w-full items-center justify-between gap-2 rounded-md border bg-surface px-3 text-base text-ink",
          "transition-colors duration-(--duration-quick) ease-out-soft",
          "disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:opacity-70",
          field.hasError ? "border-critical" : "border-line-strong",
        )}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon aria-hidden="true">▾</RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={4}
          className="z-50 overflow-hidden rounded-md border border-line bg-surface shadow-lifted"
        >
          <RadixSelect.Viewport className="p-1">
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                className={cn(
                  "cursor-pointer select-none rounded-sm px-3 py-2 text-base text-ink outline-none",
                  "data-[highlighted]:bg-accent-soft data-[highlighted]:text-accent",
                )}
              >
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
