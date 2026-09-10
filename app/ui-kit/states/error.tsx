"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function StatesError({ reset }: { reset: () => void }) {
  return (
    <div className="px-6 py-16">
      <ErrorState onRetry={reset} />
    </div>
  );
}
