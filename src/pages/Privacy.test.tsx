import { render, screen } from "@testing-library/react";
import Privacy from "./Privacy";

it("renders privacy heading", () => {
  render(<Privacy />);
  expect(screen.getByRole("heading", { name: "Política de Privacidade" })).toBeInTheDocument();
});