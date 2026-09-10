"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { cn } from "@/lib/cn";
import type { SectionData } from "@/lib/view-models";
import type { TripDay } from "@/lib/view-models/trips";

/**
 * Rencana harian (FR-053).
 *
 * Pemilih hari, lalu lini masa aktivitas — waktunya di kiri sebagai jangkar,
 * sehingga sehari terbaca sebagai urutan, bukan sebagai daftar.
 */
export function Itinerary({ data }: { data: SectionData<TripDay[]> }) {
  const days = data.state === "ready" ? data.data : [];
  const [activeId, setActiveId] = useState(days[0]?.id);

  if (data.state === "failed") return <ErrorState />;

  if (data.state === "empty") {
    return (
      <EmptyState
        title="Belum ada rencana harian."
        lede="Tidak apa-apa juga kalau mau jalan tanpa rencana."
        action={<Button variant="secondary">Tambah hari pertama</Button>}
      />
    );
  }

  const active = days.find((d) => d.id === activeId) ?? days[0];

  return (
    <div className="flex flex-col gap-8">
      <div
        role="tablist"
        aria-label="Pilih hari"
        className="-mx-6 flex gap-2 overflow-x-auto px-6"
      >
        {days.map((day) => {
          const isActive = day.id === active?.id;
          return (
            <button
              key={day.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(day.id)}
              className={cn(
                "min-h-16 shrink-0 rounded-lg border px-5 text-left",
                "transition-colors duration-(--duration-quick) ease-out-soft",
                isActive
                  ? "border-accent bg-accent-soft font-medium text-accent"
                  : "border-line-strong text-ink-soft hover:text-ink",
              )}
            >
              <span className="block text-base">{day.label}</span>
              <span className="block text-sm opacity-80">{day.date}</span>
            </button>
          );
        })}
      </div>

      {active ? (
        <div>
          {active.title ? (
            <p className="mb-6 font-display text-2xl leading-snug text-ink">
              {active.title}
            </p>
          ) : null}
          <ol className="flex flex-col gap-6">
            {active.activities.map((activity) => (
              <li key={activity.id} className="flex gap-5">
                <span className="w-14 shrink-0 pt-0.5 text-sm tabular-nums text-ink-faint">
                  {activity.startTime}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-xl leading-snug text-ink">
                    {activity.title}
                  </p>
                  {activity.location ? (
                    <p className="mt-0.5 text-sm text-ink-faint">
                      {activity.location}
                    </p>
                  ) : null}
                  {activity.estimatedCost ? (
                    <p className="mt-1 text-sm text-ink-soft">
                      Kira-kira {activity.estimatedCost}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
