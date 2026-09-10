import { describe, expect, it } from "vitest";
import { UI_STATE_OWNERS, empty, failed, ready } from "@/lib/view-models";
import type { UiState } from "@/lib/view-models";

/** Seluruh keadaan yang diwajibkan FR-022. */
const REQUIRED: UiState[] = [
  "loading",
  "ready",
  "empty",
  "failed",
  "succeeded",
  "editing",
  "saving",
  "deleting",
  "disabled",
];

describe("kontrak keadaan antarmuka", () => {
  it("setiap keadaan wajib punya penanggung jawab yang tercatat", () => {
    for (const state of REQUIRED) {
      expect(UI_STATE_OWNERS[state], `keadaan "${state}" belum punya penanggung jawab`).toBeTruthy();
    }
  });

  it("tidak ada keadaan tercatat yang berada di luar daftar wajib", () => {
    expect(Object.keys(UI_STATE_OWNERS).sort()).toEqual([...REQUIRED].sort());
  });
});

describe("SectionData", () => {
  it("membedakan kosong, terisi, dan gagal", () => {
    expect(empty().state).toBe("empty");
    expect(ready([1, 2]).state).toBe("ready");
    expect(failed("jaringan").state).toBe("failed");
  });

  it("alasan kegagalan terbawa untuk ditampilkan", () => {
    const result = failed<string[]>("Belum berhasil dimuat.");
    expect(result.state === "failed" && result.reason).toBe("Belum berhasil dimuat.");
  });
});
