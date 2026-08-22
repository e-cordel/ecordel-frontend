import { render, screen } from "@testing-library/react";
import Terms from "./Terms";

it("renders terms heading", () => {
  render(<Terms />);
  expect(screen.getByRole("heading", { name: "Termos de Uso" })).toBeInTheDocument();
});