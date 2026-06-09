import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchInputProvider } from "../../state/searchInput";
import { SearchMenuBar } from "./index";

describe("SearchMenuBar", () => {
  const heroShellClassName =
    "w-full max-w-[560px] rounded-[24px] bg-[#F8FAFC] p-[18px] text-[#0F172A] shadow-[0_16px_50px_rgba(124,255,124,0.13)] transition focus-within:ring-2 focus-within:ring-[#7CFF7C]/70 focus-within:ring-offset-2 focus-within:ring-offset-[#111827]";
  const resultsShellClassName =
    "w-full rounded-[22px] bg-[#F8FAFC] px-[18px] py-4 text-[#0F172A] shadow-[0_10px_34px_rgba(124,255,124,0.12)] transition focus-within:ring-2 focus-within:ring-[#7CFF7C]/70 focus-within:ring-offset-2 focus-within:ring-offset-[#0A0E14]";
  const searchButtonClassName =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] bg-[#0F172A] text-[#7CFF7C] transition hover:bg-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CFF7C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC]";
  const clearButtonClassName =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] text-[#64748B] transition hover:bg-slate-200/80 hover:text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7CFF7C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC]";
  const inputClassName =
    "w-full min-w-0 rounded-xl border-none bg-transparent px-1 py-2 text-base text-[#0F172A] placeholder:text-[#8B95A7] outline-none focus-visible:ring-0";

  it("renders hero helper text by default", () => {
    render(
      <MemoryRouter>
        <SearchInputProvider>
          <SearchMenuBar />
        </SearchInputProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Try: lion, fox, dolphin")).toBeInTheDocument();
    expect(screen.getByText("Press Enter")).toBeInTheDocument();
    expect(screen.getByLabelText("Search").closest("form")).toBeInTheDocument();
  });

  it("applies the hero shell and control styles", () => {
    render(
      <MemoryRouter>
        <SearchInputProvider>
          <SearchMenuBar />
        </SearchInputProvider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Search").closest("form")).toHaveClass(heroShellClassName);
    expect(screen.getByRole("button", { name: "Submit search" })).toHaveClass(searchButtonClassName);
    expect(screen.getByRole("button", { name: "Clear search" })).toHaveClass(clearButtonClassName);
    expect(screen.getByLabelText("Search")).toHaveClass(inputClassName);
    expect(screen.getByText("Try: lion, fox, dolphin")).toHaveClass("text-[#0F172A]");
    expect(screen.getByText("Press Enter")).toHaveClass(
      "rounded-full border border-[#0F172A] bg-[#0F172A] px-3 py-2 text-xs font-semibold text-[#F8FAFC]"
    );
  });

  it("applies the results shell styles", () => {
    render(
      <MemoryRouter>
        <SearchInputProvider>
          <SearchMenuBar variant="results" />
        </SearchInputProvider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Search").closest("form")).toHaveClass(resultsShellClassName);
  });

  it("hides hero helper text in the results variant", () => {
    render(
      <MemoryRouter>
        <SearchInputProvider>
          <SearchMenuBar variant="results" />
        </SearchInputProvider>
      </MemoryRouter>
    );

    expect(screen.queryByText("Try: lion, fox, dolphin")).not.toBeInTheDocument();
    expect(screen.queryByText("Press Enter")).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search an animal in English")).toBeInTheDocument();
    expect(screen.getByLabelText("Search").closest("form")).toBeInTheDocument();
  });

  it("updates and clears the search value", () => {
    render(
      <MemoryRouter>
        <SearchInputProvider>
          <SearchMenuBar />
        </SearchInputProvider>
      </MemoryRouter>
    );

    const input = screen.getByLabelText("Search");

    fireEvent.change(input, { target: { value: "lion" } });
    expect(input).toHaveValue("lion");

    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(input).toHaveValue("");
  });

  it("calls the provided submit handler when the form is submitted", () => {
    const handleSubmit = jest.fn();

    render(
      <MemoryRouter>
        <SearchInputProvider>
          <SearchMenuBar variant="results" onSubmit={handleSubmit} />
        </SearchInputProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit search" }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

});
