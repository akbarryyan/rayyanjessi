"use client";

import { Toast as RadixToast } from "radix-ui";
import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "success" | "error";
type ToastMessage = { id: number; tone: Tone; text: string };

const ToastContext = createContext<((tone: Tone, text: string) => void) | null>(
  null,
);

/** Menampilkan pemberitahuan singkat dan ramah (FR-017). */
export function useToast() {
  const push = useContext(ToastContext);
  if (!push) throw new Error("useToast harus dipakai di dalam <ToastProvider>.");
  return {
    success: (text: string) => push("success", text),
    error: (text: string) => push("error", text),
  };
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const push = useCallback((tone: Tone, text: string) => {
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), tone, text }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={push}>
      <RadixToast.Provider swipeDirection="right" duration={5000}>
        {children}
        {messages.map((message) => (
          <RadixToast.Root
            key={message.id}
            onOpenChange={(open) => {
              if (!open) dismiss(message.id);
            }}
            className={cn(
              "flex items-start gap-3 rounded-md border p-4 shadow-lifted",
              message.tone === "success"
                ? "border-positive/25 bg-positive-soft text-positive"
                : "border-critical/25 bg-critical-soft text-critical",
            )}
          >
            {/* Maknanya dibawa teks, bukan warna saja (FR-038). */}
            <RadixToast.Title className="text-base">
              {message.text}
            </RadixToast.Title>
          </RadixToast.Root>
        ))}
        {/*
          Ditempatkan di atas navigasi bawah ponsel agar tidak menutupi
          kendali (FR-017).
        */}
        <RadixToast.Viewport className="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2 sm:bottom-4" />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}
