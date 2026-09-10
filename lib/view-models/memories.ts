import type { SectionData } from "./index";

export type MemoryCard = {
  id: string;
  title: string;
  /** Tanggal, sudah diformat. */
  date: string;
  image: string | null;
  /** Perbandingan sisi gambar, untuk galeri yang tidak seragam. */
  aspect: "portrait" | "landscape" | "square";
};

export type MemoryDetail = MemoryCard & {
  story: string | null;
  location: string | null;
  /** Kaitan ke domain lain. Hanya ditampilkan bila ada. */
  relatedTrip: { id: string; title: string } | null;
  relatedEvent: { id: string; title: string } | null;
  relatedSong: { id: string; title: string; artist: string } | null;
};

export type MemoriesViewModel = {
  memories: SectionData<MemoryCard[]>;
};
