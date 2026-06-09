import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import { App } from "./app/App";

describe("App", () => {
  const alignedCanvasClass =
    "min-h-screen bg-[radial-gradient(circle_at_18%_20%,rgba(124,255,124,0.22),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(74,163,255,0.16),transparent_26%),linear-gradient(180deg,#06070B_0%,#0E1118_100%)] text-[#F8FAFC]";
  const heroSectionClass =
    "relative mx-auto flex min-h-screen w-full max-w-[760px] items-center justify-center px-4 py-8 sm:px-6 lg:px-8";
  const heroCardClass =
    "relative flex min-h-[min(820px,calc(100vh-64px))] w-full max-w-[700px] items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_68%_12%,rgba(124,255,124,0.14),transparent_34%),linear-gradient(180deg,#0B0F16_0%,#111827_100%)] px-6 py-12 text-center shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:px-14";
  const heroInnerClass = "mx-auto flex w-full max-w-[588px] flex-col items-center gap-6";

  it("renders the home route", async () => {
    window.history.pushState({}, "", "/");

    const { container } = render(<App />);

    expect(screen.getByRole("status", { name: /loading page content/i })).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByRole("status", { name: /loading page content/i }));

    expect(screen.getByRole("heading", { name: "Find animals instantly" })).toBeInTheDocument();
    expect(screen.getByText("Minimal input. Instant discovery. Built for curious minds.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit search" })).toBeInTheDocument();
    expect(container.querySelector("main")).toHaveClass(alignedCanvasClass);
  });

  it("matches the home hero frame visual contract", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    const heading = await screen.findByRole("heading", { name: "Find animals instantly" });
    const section = heading.closest("section");
    const card = section?.firstElementChild;
    const inner = card?.firstElementChild;

    expect(section).toHaveAttribute("class", heroSectionClass);
    expect(card).toHaveAttribute("class", heroCardClass);
    expect(inner).toHaveAttribute("class", heroInnerClass);
    expect(screen.getByText("Animal Search")).toHaveAttribute(
      "class",
      "flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F8FAFC]",
    );
    expect(heading).toHaveAttribute(
      "class",
      "max-w-[560px] text-[44px] font-bold leading-[1.05] tracking-[-0.03em] text-[#F8FAFC] sm:text-[54px]",
    );
    expect(
      screen.getByText("Search an animal in English and explore fast, rich results designed for quick discovery."),
    ).toHaveAttribute("class", "max-w-[520px] text-base leading-[1.45] text-[#AAB3C5] sm:text-lg");
    expect(screen.getByText("Minimal input. Instant discovery. Built for curious minds.")).toHaveAttribute(
      "class",
      "text-sm text-[#8B95A7]",
    );
  });

  it("renders the results route", async () => {
    window.history.pushState({}, "", "/results");

    render(<App />);

    expect(screen.getByRole("status", { name: /loading page content/i })).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByRole("status", { name: /loading page content/i }));

    expect(screen.getByRole("button", { name: /go to home/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Search" })).toBeInTheDocument();
    expect(screen.getByText(/Try one of these animal types:/i)).toBeInTheDocument();
  });

  it("submits search from home and navigates to results", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(await screen.findByRole("heading", { name: "Find animals instantly" })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Search"), { target: { value: "lion" } });
    fireEvent.click(screen.getByRole("button", { name: /submit search/i }));

    expect(await screen.findByLabelText("African Lion details")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Search" })).toHaveValue("lion");
  });

  it("updates the shown results when the search changes on the results route", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(await screen.findByRole("heading", { name: "Find animals instantly" })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Search"), { target: { value: "lion" } });
    fireEvent.click(screen.getByRole("button", { name: /submit search/i }));

    expect(await screen.findByLabelText("African Lion details")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox", { name: "Search" }), { target: { value: "dog" } });

    expect(screen.queryByLabelText("African Lion details")).not.toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "Golden Retriever" })).toBeInTheDocument();
    expect(screen.getByLabelText("Golden Retriever details")).toBeInTheDocument();
  });
});
