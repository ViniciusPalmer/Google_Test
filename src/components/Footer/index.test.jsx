import { render, screen } from "@testing-library/react";
import { Footer } from "./index";

describe("Footer", () => {
  it("renders copyright and version", () => {
    render(<Footer />);

    expect(screen.getByText("ⓒ Google 2021")).toBeInTheDocument();
    expect(screen.getByText("version 0.1.0")).toBeInTheDocument();
  });
});
