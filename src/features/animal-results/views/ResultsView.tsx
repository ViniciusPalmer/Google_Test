import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { IAnimal } from "../../../shared/types/animal";
import { NoResultsFound } from "../components/NoResultsFound";
import { ResultCard } from "../components/ResultCard";
import { ResultContent } from "../components/ResultContent";
import { ResultContentMobile } from "../components/ResultContentMobile";
import { useFilteredAnimals } from "../hooks/useFilteredAnimals";
import { usePaginatedAnimals } from "../hooks/usePaginatedAnimals";

const LG_BREAKPOINT = 1024;

interface ResultsViewProps {
  animalsData: ReadonlyArray<Readonly<IAnimal>>;
  searchInput: string;
  onSuggestionSelect?: (value: string) => void;
}

export function ResultsView({ animalsData, searchInput, onSuggestionSelect }: ResultsViewProps) {
  const [selectedCard, setSelectedCard] = useState<Readonly<IAnimal> | null>(null);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= LG_BREAKPOINT);
  const [currentPage, setCurrentPage] = useState(0);
  const { filteredAnimals, foundResults, suggestionList } = useFilteredAnimals(animalsData, searchInput);
  const { currentItems, pageCount, handlePageChange } = usePaginatedAnimals(filteredAnimals, 4);
  const resultCountLabel = `About ${filteredAnimals.length} result${filteredAnimals.length === 1 ? "" : "s"}`;
  const desktopDetailPanelId = "animal-details-panel";

  useEffect(() => {
    function updateViewport() {
      setIsDesktop(window.innerWidth >= LG_BREAKPOINT);
    }

    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    if (currentItems.length === 0) {
      setSelectedCard(null);
      return;
    }

    if (!isDesktop) {
      if (selectedCard && currentItems.some((animal) => animal.id === selectedCard.id)) {
        return;
      }

      setSelectedCard(null);
      return;
    }

    if (selectedCard && currentItems.some((animal) => animal.id === selectedCard.id)) {
      return;
    }

    setSelectedCard(currentItems[0]);
  }, [currentItems, isDesktop, selectedCard]);

  useEffect(() => {
    setCurrentPage(0);
  }, [filteredAnimals]);

  function onPageChange(selected: number) {
    setCurrentPage(selected);
    handlePageChange(selected);
  }

  if (!foundResults) {
    return (
      <NoResultsFound
        searchText={searchInput}
        suggestionList={suggestionList}
        onSuggestionSelect={onSuggestionSelect}
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col p-5 sm:p-6 lg:p-8">
      <div className="flex flex-1 flex-col gap-6 lg:flex-row lg:items-start lg:gap-7">
        {isDesktop ? (
          <>
            <section className="flex w-full min-w-0 flex-1 flex-col items-start lg:max-w-[560px] lg:flex-[0_0_560px]">
              <p role="status" aria-live="polite" className="mb-5 text-sm font-medium text-[#8B95A7]">
                {resultCountLabel}
              </p>
              {currentItems.map((animal) => (
                <ResultCard
                  key={animal.id}
                  animal={animal}
                  isActive={selectedCard?.id === animal.id}
                  onSelect={() => setSelectedCard(animal)}
                  ariaControls={desktopDetailPanelId}
                  ariaPressed={selectedCard?.id === animal.id}
                />
              ))}
              {pageCount > 1 ? (
                <ReactPaginate
                  breakLabel="..."
                  forcePage={currentPage}
                  nextLabel=">"
                  onPageChange={(event) => onPageChange(event.selected)}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                  className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[#AAB3C5]"
                  pageClassName="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F172A] transition hover:border-[#7CFF7C]/60 hover:text-[#7CFF7C]"
                  activeClassName="border-[#7CFF7C] bg-[#7CFF7C]/10 font-semibold text-[#7CFF7C]"
                  previousClassName="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F172A] px-3 transition hover:border-[#7CFF7C]/60 hover:text-[#7CFF7C]"
                  nextClassName="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F172A] px-3 transition hover:border-[#7CFF7C]/60 hover:text-[#7CFF7C]"
                  disabledClassName="opacity-40"
                />
              ) : null}
            </section>
            <section className="w-full min-w-0 lg:flex-1">
              {selectedCard && <ResultContent animal={selectedCard} id={desktopDetailPanelId} />}
            </section>
          </>
        ) : (
          <section className="flex w-full flex-col items-start">
            <p role="status" aria-live="polite" className="mb-5 text-sm font-medium text-[#8B95A7]">
              {resultCountLabel}
            </p>
            {currentItems.map((animal) => (
              <ResultContentMobile
                key={animal.id}
                animal={animal}
                isActive={selectedCard?.id === animal.id}
                onToggle={() => {
                  setSelectedCard((currentSelectedCard) => {
                    if (currentSelectedCard?.id === animal.id) {
                      return null;
                    }

                    return animal;
                  });
                }}
              />
            ))}
            {pageCount > 1 ? (
              <ReactPaginate
                breakLabel="..."
                forcePage={currentPage}
                nextLabel=">"
                onPageChange={(event) => onPageChange(event.selected)}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[#AAB3C5]"
                pageClassName="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F172A] transition hover:border-[#7CFF7C]/60 hover:text-[#7CFF7C]"
                activeClassName="border-[#7CFF7C] bg-[#7CFF7C]/10 font-semibold text-[#7CFF7C]"
                previousClassName="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F172A] px-3 transition hover:border-[#7CFF7C]/60 hover:text-[#7CFF7C]"
                nextClassName="flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F172A] px-3 transition hover:border-[#7CFF7C]/60 hover:text-[#7CFF7C]"
                disabledClassName="opacity-40"
              />
            ) : null}
          </section>
        )}
      </div>
    </div>
  );
}
