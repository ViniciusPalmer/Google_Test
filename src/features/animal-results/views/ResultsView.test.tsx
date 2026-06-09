import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { ResultsView } from "./ResultsView";

function setViewportWidth(width: number) {
  act(() => {
    window.innerWidth = width;
    window.dispatchEvent(new Event("resize"));
  });
}

function createAnimal(id: number, title: string) {
  return {
    id,
    title,
    type: "species",
    image: `${id}.png`,
    description: `${title} description`,
    url: `https://animal-${id}.test`,
    habitat: `${title} habitat`,
    lifespan: `${id + 5} years`,
    diet: `${title} diet`,
    summaryTag: `${title} summary`,
  };
}

const animals = [
  createAnimal(1, "Animal 1"),
  createAnimal(2, "Animal 2"),
  createAnimal(3, "Animal 3"),
  createAnimal(4, "Animal 4"),
  createAnimal(5, "Animal 5"),
  createAnimal(6, "Zebra 6"),
  createAnimal(7, "Zebra 7"),
  createAnimal(8, "Zebra 8"),
];

describe("ResultsView", () => {
  afterEach(() => {
    setViewportWidth(1024);
  });

  it("selects the first filtered result by default on desktop", () => {
    const { container } = render(<ResultsView animalsData={animals} searchInput="animal" />);

    expect(screen.getByRole("status")).toHaveTextContent("About 5 results");
    expect(container.firstChild).toHaveClass("flex h-full w-full flex-col p-5 sm:p-6 lg:p-8");
    expect(container.firstChild?.firstChild).toHaveClass(
      "flex flex-1 flex-col gap-6 lg:flex-row lg:items-start lg:gap-7"
    );
    expect(screen.getByRole("status")).toHaveClass("mb-5 text-sm font-medium text-[#8B95A7]");

    const detail = screen.getByLabelText("Animal 1 details");
    const activeButton = screen.getByRole("button", { name: "Animal 1" });
    const [resultsColumn, detailsColumn] = Array.from(container.querySelectorAll("section"));

    expect(resultsColumn).toHaveClass(
      "flex w-full min-w-0 flex-1 flex-col items-start lg:max-w-[560px] lg:flex-[0_0_560px]"
    );
    expect(detailsColumn).toHaveClass("w-full min-w-0 lg:flex-1");
    expect(within(detail).getByText("Selected result")).toBeInTheDocument();
    expect(within(detail).getByRole("heading", { name: "Animal 1" })).toBeInTheDocument();
    expect(within(detail).getByText("Animal 1 habitat")).toBeInTheDocument();
    expect(activeButton).toHaveAttribute("aria-pressed", "true");
    expect(activeButton).toHaveAttribute("aria-controls", detail.id);
    expect(screen.getByRole("button", { name: "Animal 2" })).toHaveAttribute("aria-pressed", "false");
  });

  it("resets the active pagination page when filtering changes the dataset", () => {
    const { rerender } = render(<ResultsView animalsData={animals} searchInput="species" />);

    fireEvent.click(screen.getByRole("button", { name: "Page 2" }));

    expect(screen.getByRole("button", { name: "Animal 5" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 2 is your current page" })).toBeInTheDocument();

    rerender(<ResultsView animalsData={animals} searchInput="animal" />);

    expect(screen.getByRole("button", { name: "Animal 1" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Animal 5" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 1 is your current page" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 2" })).toBeInTheDocument();
  });

  it("uses the themed pagination classes on desktop", () => {
    const { container } = render(<ResultsView animalsData={animals} searchInput="species" />);

    const pagination = container.querySelector("ul");
    const firstPage = screen.getByRole("button", { name: "Page 1 is your current page" }).closest("li");
    const nextPage = screen.getByRole("button", { name: "Page 2" }).closest("li");
    const previousPage = screen.getByRole("button", { name: "Previous page" }).closest("li");
    const nextControl = screen.getByRole("button", { name: "Next page" }).closest("li");

    expect(pagination).toHaveClass("mt-2 flex flex-wrap items-center gap-2 text-sm text-[#AAB3C5]");
    expect(nextPage).toHaveClass(
      "flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F172A] transition hover:border-[#7CFF7C]/60 hover:text-[#7CFF7C]"
    );
    expect(firstPage).toHaveClass("border-[#7CFF7C] bg-[#7CFF7C]/10 font-semibold text-[#7CFF7C]");
    expect(previousPage).toHaveClass(
      "flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F172A] px-3 transition hover:border-[#7CFF7C]/60 hover:text-[#7CFF7C] opacity-40"
    );
    expect(nextControl).toHaveClass(
      "flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F172A] px-3 transition hover:border-[#7CFF7C]/60 hover:text-[#7CFF7C]"
    );
  });

  it("selects the first item on the new page when pagination changes", () => {
    render(<ResultsView animalsData={animals} searchInput="species" />);

    fireEvent.click(screen.getByRole("button", { name: "Animal 2" }));
    fireEvent.click(screen.getByRole("button", { name: "Page 2" }));

    const detail = screen.getByLabelText("Animal 5 details");
    const activeButton = screen.getByRole("button", { name: "Animal 5" });

    expect(within(detail).getByRole("heading", { name: "Animal 5" })).toBeInTheDocument();
    expect(within(detail).getByText("Animal 5 habitat")).toBeInTheDocument();
    expect(activeButton).toHaveAttribute("aria-pressed", "true");
    expect(activeButton).toHaveAttribute("aria-controls", detail.id);
    expect(screen.queryByRole("button", { name: "Animal 2" })).not.toBeInTheDocument();
  });

  it("shows rich detail metadata for the selected animal", () => {
    render(<ResultsView animalsData={animals} searchInput="animal" />);

    fireEvent.click(screen.getByRole("button", { name: "Animal 2" }));

    const detail = screen.getByLabelText("Animal 2 details");
    const activeButton = screen.getByRole("button", { name: "Animal 2" });

    expect(within(detail).getByRole("heading", { name: "Animal 2" })).toBeInTheDocument();
    expect(within(detail).getByText("Animal 2 habitat")).toBeInTheDocument();
    expect(within(detail).getByText("7 years")).toBeInTheDocument();
    expect(within(detail).getByText("Animal 2 diet")).toBeInTheDocument();
    expect(within(detail).getByText("Animal 2 summary")).toBeInTheDocument();
    expect(within(detail).getByText("Type")).toBeInTheDocument();
    expect(within(detail).getByText("Selected result")).toBeInTheDocument();
    expect(within(detail).getByRole("img", { name: "Animal 2" })).toHaveAttribute("loading", "lazy");
    expect(within(detail).getByRole("img", { name: "Animal 2" })).toHaveAttribute("decoding", "async");
    expect(activeButton).toHaveAttribute("aria-pressed", "true");
    expect(activeButton).toHaveAttribute("aria-controls", detail.id);
  });

  it("emits suggestion recovery actions when there are no matches", () => {
    const handleSuggestionSelect = jest.fn();

    render(
      <ResultsView
        animalsData={animals}
        searchInput="penguin"
        onSuggestionSelect={handleSuggestionSelect}
      />
    );

    expect(screen.getByText("No matches found for penguin.")).toBeInTheDocument();
    expect(screen.getByText("Try one of these animal types:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "species" })).toBeInTheDocument();
    expect(screen.queryByText(/API is not working/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "species" }));

    expect(handleSuggestionSelect).toHaveBeenCalledWith("species");
  });

  it("expanded inline mobile details preserve result card semantics and styling", () => {
    setViewportWidth(480);

    render(<ResultsView animalsData={animals} searchInput="animal" />);

    const animalButton = screen.getByRole("button", { name: "Animal 1" });
    const animalCard = animalButton.closest("article");

    expect(animalCard).toHaveAttribute(
      "class",
      "mb-4 w-full rounded-[22px] border p-5 text-left transition-colors border-white/10 bg-[#0F172A]/85 hover:border-[#7CFF7C]/30 hover:bg-[#111827]/80"
    );
    expect(animalCard).toContainElement(animalButton);
    expect(screen.getByText("Animal 1 summary")).toHaveAttribute(
      "class",
      "mb-3 inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#AAB3C5]"
    );
    expect(animalButton).toHaveAttribute(
      "class",
      "mb-2 bg-transparent text-left text-2xl font-semibold text-[#F8FAFC] transition-colors hover:text-[#7CFF7C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CFF7C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
    );
    expect(screen.getByText("Animal 1 habitat")).toHaveAttribute(
      "class",
      "mb-4 text-sm font-medium text-[#AAB3C5]"
    );
    expect(screen.getByText("Animal 1 description")).toHaveAttribute(
      "class",
      "mb-4 text-base leading-7 text-[#AAB3C5]"
    );
    expect(screen.getByText("6 years").parentElement).toHaveAttribute(
      "class",
      "flex flex-wrap gap-3 text-sm text-[#8B95A7]"
    );

    expect(animalButton).toHaveAttribute("aria-expanded", "false");
    expect(animalButton).not.toHaveAttribute("aria-controls");
    expect(screen.queryByLabelText("Animal 1 details")).not.toBeInTheDocument();

    fireEvent.click(animalButton);

    expect(animalCard).toHaveAttribute(
      "class",
      "mb-4 w-full rounded-[22px] border p-5 text-left transition-colors border-[#7CFF7C]/40 bg-[#111827] shadow-[0_20px_50px_rgba(0,0,0,0.32)]"
    );
    expect(animalButton).toHaveAttribute("aria-expanded", "true");
    expect(animalButton).toHaveAttribute("aria-controls", "animal-details-1");
    expect(screen.getByLabelText("Animal 1 details")).toBeInTheDocument();

    fireEvent.click(animalButton);

    expect(animalButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByLabelText("Animal 1 details")).not.toBeInTheDocument();
  });

  it("uses the themed pagination classes on mobile", () => {
    setViewportWidth(480);

    const { container } = render(<ResultsView animalsData={animals} searchInput="species" />);

    const pagination = container.querySelector("ul");
    const firstPage = screen.getByRole("button", { name: "Page 1 is your current page" }).closest("li");
    const nextPage = screen.getByRole("button", { name: "Page 2" }).closest("li");

    expect(pagination).toHaveClass("mt-2 flex flex-wrap items-center gap-2 text-sm text-[#AAB3C5]");
    expect(nextPage).toHaveClass(
      "flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0F172A] transition hover:border-[#7CFF7C]/60 hover:text-[#7CFF7C]"
    );
    expect(firstPage).toHaveClass("border-[#7CFF7C] bg-[#7CFF7C]/10 font-semibold text-[#7CFF7C]");
  });

  it("keeps the mobile result markup through the tablet band below the lg layout breakpoint", () => {
    setViewportWidth(900);

    render(<ResultsView animalsData={animals} searchInput="animal" />);

    const animalButton = screen.getByRole("button", { name: "Animal 1" });

    expect(animalButton).toHaveAttribute("aria-expanded", "false");
    expect(animalButton).not.toHaveAttribute("aria-pressed");
    expect(screen.queryByLabelText("Animal 1 details")).not.toBeInTheDocument();
  });
});
