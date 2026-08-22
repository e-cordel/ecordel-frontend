import { render, screen } from "@testing-library/react";
import About from "./About";

it("renders about heading", () => {
  render(<About />);
  expect(screen.getByRole("heading", { name: "Sobre o E-Cordel" })).toBeInTheDocument();
});