import { render, screen } from "@testing-library/react";
import Contact from "./Contact";

it("renders contact heading", () => {
  render(<Contact />);
  expect(screen.getByRole("heading", { name: "Contato" })).toBeInTheDocument();
});