import { fireEvent, render, screen } from "@testing-library/react";
import { within } from "@testing-library/dom";
import { MemoryRouter } from "react-router-dom";
import { CordelViewer } from "../index";

const cordel = {
  id: "1",
  title: "Cordel de teste",
  description: "descricao",
  content: "Primeira estrofe\n\nSegunda estrofe\n\nTerceira estrofe",
  published: true,
  tags: ["Romance"],
  author: { id: 1, name: "Autor" },
  xilogravura: { url: "" },
  year: 2020,
  ebookUrl: "",
  source: "Fonte de teste",
};

describe("CordelViewer", () => {
  it("shows full text by default and toggles to paginated mode", () => {
    render(
      <MemoryRouter>
        <CordelViewer cordel={cordel} />
      </MemoryRouter>
    );

    expect(screen.queryByText("Página 1 / 2")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Anterior" })).not.toBeInTheDocument();
    const readingArea = screen.getByTestId("reading-area");
    expect(within(readingArea).getAllByRole("paragraph")).toHaveLength(3);

    fireEvent.click(screen.getByRole("button", { name: "Modo paginado" }));

    expect(screen.getByText("Página 1 / 2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Anterior" })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Próxima" }));

    expect(screen.getByText("Página 2 / 2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Próxima" })).toBeDisabled();
  });

  it("changes font size using reading preferences and does not render theme section", () => {
    render(
      <MemoryRouter>
        <CordelViewer cordel={cordel} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Aumentar fonte" }));
    expect(screen.getByText("110%")).toBeInTheDocument();
    expect(screen.queryByText("Tema de leitura")).not.toBeInTheDocument();
    expect(screen.getByTestId("reading-area")).toBeInTheDocument();
  });
});