import { describe, expect, it } from "vitest";
import {
  NAV_ITEMS,
  PRIMARY_MOBILE_ITEMS,
  SECONDARY_MOBILE_ITEMS,
  activeNavLabel,
  hrefFor,
} from "@/lib/navigation";

describe("peta navigasi", () => {
  it("setiap butir punya label unik", () => {
    const labels = NAV_ITEMS.map((i) => i.label);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it("butir utama dan sekunder bersama-sama meliputi seluruh tujuan", () => {
    expect(PRIMARY_MOBILE_ITEMS.length + SECONDARY_MOBILE_ITEMS.length).toBe(
      NAV_ITEMS.length,
    );
  });

  it("navigasi bawah ponsel tetap ringkas", () => {
    // Ditambah satu jalan menuju sisanya, totalnya harus tetap muat di ibu jari.
    expect(PRIMARY_MOBILE_ITEMS.length).toBeLessThanOrEqual(4);
  });

  it("tujuan section menghasilkan alamat yang dapat ditautkan ulang", () => {
    const section = NAV_ITEMS.find((i) => i.destination.kind === "section")!;
    expect(hrefFor(section)).toMatch(/^\/#/);
  });
});

describe("activeNavLabel", () => {
  it("menandai halaman berdasarkan route aktif", () => {
    expect(activeNavLabel("/memories", null)).toBe("Kenangan");
    expect(activeNavLabel("/letters", null)).toBe("Surat");
  });

  it("halaman detail tetap menandai bagian induknya", () => {
    expect(activeNavLabel("/memories/abc123", null)).toBe("Kenangan");
    expect(activeNavLabel("/trips/xyz/itinerary", null)).toBe("Perjalanan");
  });

  it("beranda tidak ikut tertandai oleh route lain", () => {
    // "/" adalah awalan setiap route, jadi pencocokan naif akan salah di sini.
    expect(activeNavLabel("/memories", null)).not.toBe("Beranda");
    expect(activeNavLabel("/", null)).toBe("Beranda");
  });

  it("section yang terlihat menang ketika berada di landing page", () => {
    expect(activeNavLabel("/", "our-time")).toBe("Waktu Kita");
    expect(activeNavLabel("/", "future")).toBe("Nanti");
  });

  it("section yang terlihat diabaikan ketika tidak di landing page", () => {
    expect(activeNavLabel("/memories", "our-time")).toBe("Kenangan");
  });

  it("section yang tidak dikenal tidak menandai apa pun secara keliru", () => {
    expect(activeNavLabel("/", "tidak-ada")).toBe("Beranda");
  });

  it("route yang tidak dikenal tidak menandai butir mana pun", () => {
    expect(activeNavLabel("/entah", null)).toBeNull();
  });
});
