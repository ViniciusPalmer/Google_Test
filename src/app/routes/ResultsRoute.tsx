import { useContext } from "react";
import { AnimalsDataContext } from "../../features/animal-data/state/animalData";
import { ResultsView } from "../../features/animal-results/views/ResultsView";
import { SearchInputContext } from "../../features/animal-search/state/searchInput";
import { SeoMetadata } from "../../shared/components/SeoMetadata";
import { ResultsHeader } from "./components/ResultsHeader";
import { ResultsShell } from "./components/ResultsShell";

export function ResultsRoute() {
  const { animalsData } = useContext(AnimalsDataContext);
  const { searchInput, setSearchInput } = useContext(SearchInputContext);

  return (
    <>
      <SeoMetadata
        title={`Animal Search${searchInput ? ` - ${searchInput}` : ""}`}
        description={`Search results for ${searchInput}`}
      />
      <ResultsShell>
        <ResultsHeader />
        <section className="mt-6 flex flex-1 overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_88%_10%,rgba(124,255,124,0.12),transparent_32%),linear-gradient(180deg,#0A0E14_0%,#11161E_100%)] shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
          <ResultsView
            animalsData={animalsData}
            searchInput={searchInput}
            onSuggestionSelect={setSearchInput}
          />
        </section>
      </ResultsShell>
    </>
  );
}
