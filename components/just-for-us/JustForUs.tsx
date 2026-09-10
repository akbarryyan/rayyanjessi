"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import type { JustForUsViewModel } from "@/lib/view-models/collections";

/**
 * Sudut bermain (FR-059).
 *
 * Nadanya bermain, bukan bersaing: tidak ada skor, tidak ada papan peringkat,
 * tidak ada "benar/salah" yang dibesar-besarkan. Jawaban ditampilkan sebagai
 * tebakan yang diungkap, bukan sebagai nilai.
 */
function Choice({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "min-h-12 w-full rounded-md border px-4 text-left text-base",
        "transition-colors duration-(--duration-quick) ease-out-soft",
        selected
          ? "border-accent bg-accent-soft font-medium text-accent"
          : "border-line-strong text-ink hover:bg-surface-sunken",
      )}
    >
      {label}
    </button>
  );
}

export function JustForUs({ vm }: { vm: JustForUsViewModel }) {
  const [quizPick, setQuizPick] = useState<string>();
  const [likelyPick, setLikelyPick] = useState<string>();

  const nothingAvailable =
    vm.dailyQuestion.state === "empty" &&
    vm.quiz.state === "empty" &&
    vm.moreLikely.state === "empty";

  if (nothingAvailable) {
    return (
      <EmptyState
        title="Belum ada apa-apa buat main."
        lede="Nanti ada, kok. Sementara ini ngobrol saja dulu."
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {vm.dailyQuestion.state === "ready" ? (
        <Card className="p-6">
          <p className="text-sm uppercase tracking-wide text-ink-faint">
            Pertanyaan hari ini
          </p>
          <p className="mt-3 max-w-prose font-display text-2xl leading-snug text-ink">
            {vm.dailyQuestion.data.question}
          </p>
          <div className="mt-5">
            <Button variant="secondary">
              {vm.dailyQuestion.data.answered ? "Ubah jawaban" : "Jawab"}
            </Button>
          </div>
        </Card>
      ) : null}

      {vm.quiz.state === "ready" ? (
        <Card className="p-6">
          <p className="text-sm uppercase tracking-wide text-ink-faint">
            Seberapa kenal kamu sama aku
          </p>
          <p className="mt-3 max-w-prose font-display text-2xl leading-snug text-ink">
            {vm.quiz.data.question}
          </p>
          <div className="mt-5 flex flex-col gap-2">
            {vm.quiz.data.options.map((option) => (
              <Choice
                key={option}
                label={option}
                selected={quizPick === option}
                onSelect={() => setQuizPick(option)}
              />
            ))}
          </div>
        </Card>
      ) : null}

      {vm.moreLikely.state === "ready" ? (
        <Card className="p-6">
          <p className="text-sm uppercase tracking-wide text-ink-faint">
            Siapa yang lebih mungkin
          </p>
          <p className="mt-3 max-w-prose font-display text-2xl leading-snug text-ink">
            {vm.moreLikely.data.question}
          </p>
          <div className="mt-5 flex flex-col gap-2">
            {vm.moreLikely.data.options.map((option) => (
              <Choice
                key={option}
                label={option}
                selected={likelyPick === option}
                onSelect={() => setLikelyPick(option)}
              />
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
