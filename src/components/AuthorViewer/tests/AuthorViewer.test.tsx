import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { AuthorViewer } from "../index";

const author = {
  id: 1,
  name: "Patativa",
  about: "Poeta popular",
  email: "patativa@cordel.com",
};

const cordels = [
  {
    id: 1,
    title: "A Chegada",
    xilogravuraUrl: "",
    authorName: "Patativa",
    authorId: 1,
    ebookUrl: "",
    tags: ["Romance"],
  },
  {
    id: 2,
    title: "O Sertão",
    xilogravuraUrl: "",
    authorName: "Patativa",
    authorId: 1,
    ebookUrl: "",
    tags: ["Regional"],
  },
];

describe("AuthorViewer", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("toggles follow button without API calls", async () => {
    render(
      <MemoryRouter>
        <AuthorViewer author={author} cordels={cordels} />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: "Seguir Autor" });
    fireEvent.click(button);

    expect(await screen.findByRole("button", { name: "Seguindo" })).toBeInTheDocument();
  });

  it("uses share api when available", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { share });

    render(
      <MemoryRouter>
        <AuthorViewer author={author} cordels={cordels} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Compartilhar" }));

    await waitFor(() => {
      expect(share).toHaveBeenCalledTimes(1);
    });
  });
});