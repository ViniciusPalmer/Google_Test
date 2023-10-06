import { render, screen } from "@testing-library/react";
import { Footer } from "./index";

describe("App", () => {
  it("renders headline", () => {
    render(<Footer />);

    screen.debug();
  });
});
