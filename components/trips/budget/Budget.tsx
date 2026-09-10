import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Button } from "@/components/ui/Button";
import {
  EXPENSE_CATEGORY_LABELS,
  type BudgetViewModel,
} from "@/lib/view-models/trips";

/**
 * Catatan anggaran (FR-054).
 *
 * Sengaja BUKAN dasbor keuangan: tanpa grafik lingkaran, tanpa deretan kartu
 * angka, tanpa persentase di mana-mana. Satu kalimat berisi berapa yang
 * sudah terpakai, satu penanda kemajuan, lalu daftar sederhana.
 *
 * Ketika perjalanan tidak menetapkan batas anggaran, totalnya tetap tampil
 * tanpa perbandingan — sesuai docs/architecture.md §15.
 */
export function Budget({ vm }: { vm: BudgetViewModel }) {
  if (vm.expenses.state === "failed") return <ErrorState />;

  if (vm.expenses.state === "empty") {
    return (
      <EmptyState
        title="Belum ada pengeluaran tercatat."
        lede="Catat seadanya saja, tidak perlu rapi."
        action={<Button variant="secondary">Catat pengeluaran</Button>}
      />
    );
  }

  const overLimit = vm.percentOfLimit !== null && vm.percentOfLimit > 1;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="max-w-prose text-lg leading-relaxed text-ink">
          {vm.limitLabel ? (
            <>
              Sudah terpakai <strong>{vm.spentLabel}</strong> dari{" "}
              {vm.limitLabel}.
              {overLimit ? " Sedikit lewat dari rencana." : ""}
            </>
          ) : (
            <>
              Sudah terpakai <strong>{vm.spentLabel}</strong>. Tidak ada batas
              yang kita tetapkan untuk perjalanan ini.
            </>
          )}
        </p>

        {vm.percentOfLimit !== null ? (
          <div
            role="progressbar"
            aria-label="Anggaran terpakai"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(vm.percentOfLimit * 100)}
            className="mt-4 h-2 w-full overflow-hidden rounded-full bg-surface-sunken"
          >
            <div
              className={overLimit ? "h-full bg-critical" : "h-full bg-accent"}
              style={{ width: `${Math.min(vm.percentOfLimit, 1) * 100}%` }}
            />
          </div>
        ) : null}
      </div>

      {vm.byCategory.length > 0 ? (
        <div>
          <h3 className="font-display text-xl text-ink">Ke mana perginya</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {vm.byCategory.map((entry) => (
              <li key={entry.category} className="flex items-baseline gap-4">
                <span className="w-32 shrink-0 text-base text-ink-soft">
                  {EXPENSE_CATEGORY_LABELS[entry.category]}
                </span>
                <span className="text-base tabular-nums text-ink">
                  {entry.amountLabel}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <h3 className="font-display text-xl text-ink">Rinciannya</h3>
        <ul className="mt-4 flex flex-col divide-y divide-line">
          {vm.expenses.data.map((expense) => (
            <li
              key={expense.id}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
            >
              <span className="min-w-0 text-base text-ink">{expense.title}</span>
              <span className="text-base tabular-nums text-ink-soft">
                {expense.amountLabel}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
