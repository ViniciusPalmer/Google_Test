import { SeoMetadata } from "../../shared/components/SeoMetadata";
import { SearchHero } from "./components/SearchHero";

export function HomeRoute() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_18%_20%,rgba(124,255,124,0.22),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(74,163,255,0.16),transparent_26%),linear-gradient(180deg,#06070B_0%,#0E1118_100%)] text-[#F8FAFC]">
      <SeoMetadata title="Animal Search" description="Search for various animals by type or name" />
      <SearchHero />
    </main>
  );
}
