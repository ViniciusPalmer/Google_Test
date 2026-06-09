import { useState } from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ResultsRoute } from "./ResultsRoute";
import { AnimalsDataContext } from "../../features/animal-data/state/animalData";
import { SearchInputContext } from "../../features/animal-search/state/searchInput";

const animalsData = [
  {
    id: 1,
    title: "Snow Leopard",
    type: "species",
    image: "snow-leopard.png",
    description: "A mountain predator.",
    url: "https://example.com/snow-leopard",
    habitat: "Mountain ranges",
    lifespan: "15 years",
    diet: "Carnivore",
    summaryTag: "Elusive alpine hunter",
  },
  {
    id: 2,
    title: "Red Fox",
    type: "species",
    image: "red-fox.png",
    description: "A swift woodland omnivore.",
    url: "https://example.com/red-fox",
    habitat: "Forests",
    lifespan: "6 years",
    diet: "Omnivore",
    summaryTag: "Adaptable forest runner",
  },
];

function ResultsRouteWithSearchState({ initialSearchInput }: { initialSearchInput: string }) {
  const [searchInput, setSearchInput] = useState(initialSearchInput);

  return (
    <MemoryRouter initialEntries={["/results"]}>
      <SearchInputContext.Provider value={{ searchInput, setSearchInput }}>
        <AnimalsDataContext.Provider value={{ animalsData }}>
          <ResultsRoute />
        </AnimalsDataContext.Provider>
      </SearchInputContext.Provider>
    </MemoryRouter>
  );
}

function setViewportWidth(width: number) {
  act(() => {
    window.innerWidth = width;
    window.dispatchEvent(new Event("resize"));
  });
}

describe("ResultsRoute", () => {
  afterEach(() => {
    setViewportWidth(1024);
  });

  const alignedCanvasClass =
    "min-h-screen bg-[radial-gradient(circle_at_18%_20%,rgba(124,255,124,0.22),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(74,163,255,0.16),transparent_26%),linear-gradient(180deg,#06070B_0%,#0E1118_100%)] text-[#F8FAFC]";
  const alignedResultsWrapperClass =
    "mx-auto flex min-h-screen w-full max-w-[1064px] flex-col px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8";
  const alignedResultsHeaderClass =
    "rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_70%_10%,rgba(124,255,124,0.10),transparent_34%),linear-gradient(180deg,rgba(10,14,20,0.94)_0%,rgba(17,22,30,0.9)_100%)] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.34)]";
  const alignedResultsHeaderLayoutClass =
    "flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between";
  const alignedBackButtonClass =
    "flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-left text-[#F8FAFC] transition hover:border-[#7CFF7C]/50 hover:text-[#7CFF7C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CFF7C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0E14]";
  const alignedHelperTextClass = "mt-3 pl-1 text-sm text-[#8B95A7]";
  const alignedResultsFrameClass =
    "mt-6 flex flex-1 overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_88%_10%,rgba(124,255,124,0.12),transparent_32%),linear-gradient(180deg,#0A0E14_0%,#11161E_100%)] shadow-[0_30px_90px_rgba(0,0,0,0.4)]";
  const alignedDetailArticleClass =
    "w-full rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_85%_8%,rgba(124,255,124,0.13),transparent_30%),linear-gradient(180deg,#101723_0%,#131C2A_100%)] p-5 shadow-[0_18px_52px_rgba(0,0,0,0.32)] lg:sticky lg:top-6 lg:p-[22px]";
  const alignedDetailImageClass = "mb-6 h-64 w-full rounded-[22px] object-cover";
  const alignedDetailEyebrowClass =
    "mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7CFF7C]";
  const alignedDetailTypeClass =
    "mb-3 inline-flex rounded-full border border-white/10 bg-[#0F172A] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#AAB3C5]";
  const alignedDetailHeadingClass =
    "mb-3 text-3xl font-semibold text-[#F8FAFC] lg:text-[34px] lg:leading-[1.15]";
  const alignedDetailDescriptionClass = "mb-5 text-base leading-7 text-[#AAB3C5]";
  const alignedAtAGlanceClass =
    "mb-6 rounded-[24px] border border-white/10 bg-[#0F172A]/70 p-4 text-[#F8FAFC]";
  const alignedAtAGlanceLabelClass =
    "text-sm font-semibold uppercase tracking-[0.2em] text-[#8B95A7]";
  const alignedAtAGlanceValueClass = "mt-2 text-lg font-medium text-[#F8FAFC]";
  const alignedMetadataCardClass =
    "rounded-[20px] border border-white/10 bg-[#0F172A]/70 px-4 py-4";
  const alignedMetadataLabelClass =
    "text-xs font-semibold uppercase tracking-[0.18em] text-[#8B95A7]";
  const alignedMetadataValueClass = "mt-2 text-base font-medium text-[#F8FAFC]";
  const alignedNoResultsShellClass =
    "flex min-h-[320px] w-full items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-[#0F172A]/75 px-6 py-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.24)]";
  const alignedNoResultsTitleClass = "text-xl font-semibold text-[#F8FAFC]";
  const alignedNoResultsCopyClass = "mt-3 text-sm leading-6 text-[#AAB3C5]";
  const alignedNoResultsSuggestionLabelClass =
    "text-sm font-semibold uppercase tracking-[0.18em] text-[#8B95A7]";
  const alignedNoResultsSuggestionButtonClass =
    "rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-[#F8FAFC] transition hover:border-[#7CFF7C]/50 hover:bg-[#7CFF7C]/10 hover:text-[#7CFF7C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CFF7C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]";

  it("renders the redesigned results shell with search and result content", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/results"]}>
        <SearchInputContext.Provider
          value={{ searchInput: "snow", setSearchInput: jest.fn() }}
        >
          <AnimalsDataContext.Provider value={{ animalsData }}>
            <ResultsRoute />
          </AnimalsDataContext.Provider>
        </SearchInputContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole("textbox", { name: "Search" })).toBeInTheDocument();
    expect(screen.queryByText(/version 0\.1\.0/i)).not.toBeInTheDocument();
    expect(container.querySelector("main")).toHaveClass(alignedCanvasClass);
    expect(container.querySelector("main > div")).toHaveClass(alignedResultsWrapperClass);

    const header = container.querySelector("header");
    const headerLayout = header?.querySelector("div");
    const backButton = screen.getByRole("button", { name: "Go to home" });
    const helperText = screen.getByText("Search an animal in English");
    const resultsFrame = container.querySelector("main > div > section");

    expect(header).toHaveClass(alignedResultsHeaderClass);
    expect(headerLayout).toHaveClass(alignedResultsHeaderLayoutClass);
    expect(backButton).toHaveClass(alignedBackButtonClass);
    expect(helperText).toHaveClass(alignedHelperTextClass);
    expect(resultsFrame).toHaveClass(alignedResultsFrameClass);

    const details = screen.getByLabelText("Snow Leopard details");
    const activeButton = screen.getByRole("button", { name: "Snow Leopard" });

    expect(screen.getByRole("status")).toHaveTextContent("About 1 result");
    expect(within(details).getByRole("heading", { name: "Snow Leopard" })).toBeInTheDocument();
    expect(within(details).getByText("Mountain ranges")).toBeInTheDocument();
    expect(details).toHaveAttribute("class", alignedDetailArticleClass);
    expect(within(details).getByRole("img", { name: "Snow Leopard" })).toHaveAttribute(
      "class",
      alignedDetailImageClass
    );
    expect(within(details).getByText("Selected result")).toHaveAttribute("class", alignedDetailEyebrowClass);
    expect(within(details).getAllByText("species")[0]).toHaveAttribute("class", alignedDetailTypeClass);
    expect(within(details).getByRole("heading", { name: "Snow Leopard" })).toHaveAttribute(
      "class",
      alignedDetailHeadingClass
    );
    expect(within(details).getByText("A mountain predator.")).toHaveAttribute(
      "class",
      alignedDetailDescriptionClass
    );

    const atAGlance = within(details).getByText("At a glance").parentElement;

    expect(atAGlance).toHaveAttribute("class", alignedAtAGlanceClass);
    expect(within(details).getByText("At a glance")).toHaveAttribute("class", alignedAtAGlanceLabelClass);
    expect(within(details).getByText("Elusive alpine hunter")).toHaveAttribute(
      "class",
      alignedAtAGlanceValueClass
    );
    expect(within(details).getByText("Habitat").parentElement).toHaveAttribute("class", alignedMetadataCardClass);
    expect(within(details).getByText("Habitat")).toHaveAttribute("class", alignedMetadataLabelClass);
    expect(within(details).getByText("Mountain ranges")).toHaveAttribute("class", alignedMetadataValueClass);
    expect(container.querySelector('[class*="backdrop-blur"]')).toBeNull();
    expect(activeButton).toHaveAttribute("aria-pressed", "true");
    expect(activeButton).toHaveAttribute("aria-controls", details.id);
  });

  it("preserves mobile card expansion while using the aligned detail wrappers", () => {
    setViewportWidth(480);

    render(<ResultsRouteWithSearchState initialSearchInput="snow" />);

    const animalButton = screen.getByRole("button", { name: "Snow Leopard" });
    const mobileRoot = animalButton.closest("article")?.parentElement;

    expect(mobileRoot).toHaveAttribute("class", "mb-4 w-full");
    expect(screen.queryByLabelText("Snow Leopard details")).not.toBeInTheDocument();

    fireEvent.click(animalButton);

    const details = screen.getByLabelText("Snow Leopard details");

    expect(animalButton).toHaveAttribute("aria-expanded", "true");
    expect(animalButton).toHaveAttribute("aria-controls", "animal-details-1");
    expect(details.parentElement).toHaveAttribute("class", "mt-4");
    expect(details).toHaveAttribute("class", alignedDetailArticleClass);
  });

  it("recovers from no results by composing suggestion selection through search state", () => {
    render(<ResultsRouteWithSearchState initialSearchInput="penguin" />);

    const noResultsTitle = screen.getByText("No matches found for penguin.");
    const noResultsShell = noResultsTitle.closest("section");
    const noResultsCopy = screen.getByText(
      "Try a broader term or browse one of the available animal types from the local dataset."
    );
    const suggestionLabel = screen.getByText("Try one of these animal types:");
    const suggestionButton = screen.getByRole("button", { name: "species" });

    expect(noResultsTitle).toBeInTheDocument();
    expect(noResultsShell).toHaveAttribute("class", alignedNoResultsShellClass);
    expect(noResultsShell).toHaveAttribute("role", "status");
    expect(noResultsShell).toHaveAttribute("aria-live", "polite");
    expect(noResultsTitle).toHaveAttribute("class", alignedNoResultsTitleClass);
    expect(noResultsCopy).toHaveAttribute("class", alignedNoResultsCopyClass);
    expect(suggestionLabel).toHaveAttribute("class", alignedNoResultsSuggestionLabelClass);
    expect(suggestionButton).toHaveAttribute("class", alignedNoResultsSuggestionButtonClass);

    fireEvent.click(suggestionButton);

    expect(screen.getByDisplayValue("species")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("About 2 results");
    expect(screen.queryByText("No matches found for penguin.")).not.toBeInTheDocument();
  });
});
