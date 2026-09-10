import type { FixtureSet } from "./index";
import { LONG_TITLE } from "./index";
import { empty, ready } from "@/lib/view-models";
import type {
  BudgetViewModel,
  ChecklistViewModel,
  ItineraryViewModel,
  TripsViewModel,
} from "@/lib/view-models/trips";

export const tripsFixtures: FixtureSet<TripsViewModel> = {
  typical: {
    trips: ready([
      { id: "t1", title: "Bali Desember", destination: "Bali", dateRange: "12 — 16 Desember 2026", status: "planned", daysToGo: 42, coverImage: null, budgetProgress: { spentLabel: "Rp3.250.000", limitLabel: "Rp5.000.000", percent: 0.65 }, checklistProgress: { done: 4, total: 7 } },
      { id: "t2", title: "Yogyakarta", destination: "Yogyakarta", dateRange: "3 — 5 Januari 2025", status: "completed", daysToGo: -600, coverImage: null, budgetProgress: { spentLabel: "Rp1.800.000", limitLabel: null, percent: null }, checklistProgress: { done: 6, total: 6 } },
    ]),
  },
  longText: {
    trips: ready([
      { id: "t1", title: LONG_TITLE, destination: LONG_TITLE, dateRange: "12 — 16 Desember 2026", status: "ongoing", daysToGo: 0, coverImage: null, budgetProgress: { spentLabel: "Rp12.500.000", limitLabel: "Rp10.000.000", percent: 1.25 }, checklistProgress: { done: 0, total: 12 } },
    ]),
  },
  noImages: {
    trips: ready([
      { id: "t1", title: "Akhir pekan dekat rumah", destination: "Bogor", dateRange: "1 — 2 Oktober 2026", status: "planned", daysToGo: 7, coverImage: null, budgetProgress: null, checklistProgress: null },
    ]),
  },
  empty: { trips: empty() },
};

export const itineraryFixtures: FixtureSet<ItineraryViewModel> = {
  typical: {
    days: ready([
      { id: "d1", label: "Hari 1", date: "12 Desember", title: "Datang & jalan-jalan", activities: [
        { id: "a1", startTime: "09:00", title: "Sarapan", location: "Hotel", estimatedCost: null },
        { id: "a2", startTime: "11:00", title: "Ke pantai", location: "Pantai Kuta", estimatedCost: "Rp50.000" },
        { id: "a3", startTime: "19:00", title: "Makan malam", location: null, estimatedCost: "Rp250.000" },
      ]},
      { id: "d2", label: "Hari 2", date: "13 Desember", title: null, activities: [
        { id: "a4", startTime: "08:00", title: "Jalan pagi", location: null, estimatedCost: null },
      ]},
    ]),
  },
  longText: {
    days: ready([
      { id: "d1", label: "Hari 1", date: "12 Desember", title: LONG_TITLE, activities: [
        { id: "a1", startTime: "09:00", title: LONG_TITLE, location: LONG_TITLE, estimatedCost: "Rp1.250.000" },
      ]},
    ]),
  },
  noImages: {
    days: ready([
      { id: "d1", label: "Hari 1", date: "1 Oktober", title: null, activities: [
        { id: "a1", startTime: "10:00", title: "Berangkat", location: null, estimatedCost: null },
      ]},
    ]),
  },
  empty: { days: empty() },
};

export const budgetFixtures: FixtureSet<BudgetViewModel> = {
  typical: {
    limitLabel: "Rp5.000.000",
    spentLabel: "Rp3.250.000",
    percentOfLimit: 0.65,
    byCategory: [
      { category: "accommodation", amountLabel: "Rp1.200.000", share: 0.37 },
      { category: "transportation", amountLabel: "Rp900.000", share: 0.28 },
      { category: "food", amountLabel: "Rp750.000", share: 0.23 },
      { category: "activity", amountLabel: "Rp400.000", share: 0.12 },
    ],
    expenses: ready([
      { id: "x1", title: "Hotel", category: "accommodation", amountLabel: "Rp1.200.000", share: 0.37 },
      { id: "x2", title: "Tiket kereta", category: "transportation", amountLabel: "Rp900.000", share: 0.28 },
      { id: "x3", title: "Makan", category: "food", amountLabel: "Rp750.000", share: 0.23 },
      { id: "x4", title: "Tiket masuk", category: "activity", amountLabel: "Rp400.000", share: 0.12 },
    ]),
  },
  longText: {
    limitLabel: "Rp10.000.000",
    spentLabel: "Rp12.500.000",
    percentOfLimit: 1.25,
    byCategory: [{ category: "other", amountLabel: "Rp12.500.000", share: 1 }],
    expenses: ready([
      { id: "x1", title: LONG_TITLE, category: "other", amountLabel: "Rp12.500.000", share: 1 },
    ]),
  },
  // Perjalanan tanpa batas anggaran: totalnya tetap tampil, tanpa perbandingan.
  noImages: {
    limitLabel: null,
    spentLabel: "Rp1.800.000",
    percentOfLimit: null,
    byCategory: [{ category: "food", amountLabel: "Rp1.800.000", share: 1 }],
    expenses: ready([
      { id: "x1", title: "Makan sepanjang jalan", category: "food", amountLabel: "Rp1.800.000", share: 1 },
    ]),
  },
  empty: { limitLabel: null, spentLabel: "Rp0", percentOfLimit: null, byCategory: [], expenses: empty() },
};

export const checklistFixtures: FixtureSet<ChecklistViewModel> = {
  typical: {
    progress: { done: 4, total: 7 },
    items: ready([
      { id: "c1", title: "Pesan hotel", done: true, assignedTo: "A" },
      { id: "c2", title: "Beli tiket", done: true, assignedTo: "A" },
      { id: "c3", title: "Siapkan baju", done: true, assignedTo: "B" },
      { id: "c4", title: "Isi daya kamera", done: true, assignedTo: null },
      { id: "c5", title: "Bawa obat", done: false, assignedTo: "B" },
      { id: "c6", title: "Cetak tiket", done: false, assignedTo: null },
      { id: "c7", title: "Titip kunci ke tetangga", done: false, assignedTo: "A" },
    ]),
  },
  longText: {
    progress: { done: 0, total: 1 },
    items: ready([{ id: "c1", title: LONG_TITLE, done: false, assignedTo: "B" }]),
  },
  noImages: {
    progress: { done: 1, total: 1 },
    items: ready([{ id: "c1", title: "Semua sudah siap", done: true, assignedTo: null }]),
  },
  empty: { progress: { done: 0, total: 0 }, items: empty() },
};
