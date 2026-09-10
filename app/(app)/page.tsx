import { FutureList } from "@/components/future/FutureList";
import { HomeHero } from "@/components/home/HomeHero";
import { ImportantDates } from "@/components/important-dates/ImportantDates";
import { JustForUs } from "@/components/just-for-us/JustForUs";
import { OurTime } from "@/components/time/OurTime";
import { LatestLetterCard } from "@/components/home/LatestLetterCard";
import { RecentMemories } from "@/components/home/RecentMemories";
import { UpcomingTripCard } from "@/components/home/UpcomingTripCard";
import { LandingSection } from "@/components/layout/LandingSection";
import {
  futureFixtures,
  importantDatesFixtures,
  justForUsFixtures,
  ourTimeFixtures,
} from "@/lib/fixtures/collections";
import { homeFixtures } from "@/lib/fixtures/home";
import { resolveVariant } from "@/lib/fixtures/variant";
import type { FixtureSet } from "@/lib/fixtures";
import type { HomeViewModel } from "@/lib/view-models/home";

/**
 * Landing page — satu halaman panjang berisi seluruh bagian yang ringkas,
 * disusun mengikuti alur PAST → NOW → FUTURE.
 *
 * UTANG YANG DISENGAJA: halaman ini masih menyusun view model-nya dari
 * fixture, karena data model Home belum ada. Ketika spec domainnya mendarat,
 * yang berubah hanya penyusun di bawah — komponennya tidak (FR-063).
 * Dihitung oleh T120 lewat perintah pada quickstart.md.
 *
 * Section Our Future, Just For Us, Our Time, dan Important Dates masih berupa
 * rangka; keempatnya diisi pada T105, T107, T109, dan T111.
 */
function buildHomeViewModel(variant: keyof FixtureSet<HomeViewModel>): HomeViewModel {
  return homeFixtures[variant];
}

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  const key = resolveVariant(variant);
  const vm = buildHomeViewModel(key);

  return (
    <div className="w-full px-6 py-12 lg:py-16">
      <HomeHero greeting={vm.greeting} duration={vm.duration} />

      <LandingSection
        id="now"
        title="Sekarang"
        lede="Yang sedang berjalan di antara kita."
      >
        <div className="flex flex-col gap-6">
          <UpcomingTripCard data={vm.upcomingTrip} />
          <LatestLetterCard data={vm.latestLetter} />
        </div>
      </LandingSection>

      <LandingSection
        id="past"
        title="Yang sudah lewat"
        lede="Hal-hal kecil yang sayang kalau sampai lupa."
      >
        <RecentMemories data={vm.recentMemories} />
      </LandingSection>

      <LandingSection
        id="our-time"
        title="Waktu kita"
        lede="Sudah sejauh ini kita berjalan bersama."
      >
        <OurTime vm={ourTimeFixtures[key]} />
      </LandingSection>

      <LandingSection
        id="important-dates"
        title="Tanggal penting"
        lede="Hari-hari yang tidak boleh terlewat begitu saja."
      >
        <ImportantDates vm={importantDatesFixtures[key]} />
      </LandingSection>

      <LandingSection
        id="future"
        title="Nanti"
        lede="Hal-hal yang belum kita lakukan, tapi ingin."
      >
        <FutureList data={futureFixtures[key].items} />
      </LandingSection>

      <LandingSection
        id="just-for-us"
        title="Cuma kita"
        lede="Sudut kecil yang cuma milik kita berdua."
      >
        <JustForUs vm={justForUsFixtures[key]} />
      </LandingSection>
    </div>
  );
}
