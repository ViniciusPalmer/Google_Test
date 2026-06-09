import { useState } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
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

describe("ResultsRoute", () => {
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
    expect(container.querySelector('[class*="backdrop-blur"]')).toBeNull();
    expect(activeButton).toHaveAttribute("aria-pressed", "true");
    expect(activeButton).toHaveAttribute("aria-controls", details.id);
  });

  it("recovers from no results by composing suggestion selection through search state", () => {
    render(<ResultsRouteWithSearchState initialSearchInput="penguin" />);

    expect(screen.getByText("No matches found for penguin.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "species" }));

    expect(screen.getByDisplayValue("species")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("About 2 results");
    expect(screen.queryByText("No matches found for penguin.")).not.toBeInTheDocument();
  });
});
