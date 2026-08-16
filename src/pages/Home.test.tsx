import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import Home from "./Home";
import {
  PaginatedCordels,
  usePaginatedCordels,
} from "../hooks/usePaginatedCordels";

vi.mock("../hooks/usePaginatedCordels");

const mockedUsePaginatedCordels = vi.mocked(usePaginatedCordels);

const cordel = {
  id: 1,
  title: "A chegada",
  xilogravuraUrl: "",
  authorName: "Autor Um",
  authorId: 1,
  ebookUrl: "",
};

const renderHome = () =>
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

const paginatedResult = (
  overrides: Partial<PaginatedCordels> = {}
): PaginatedCordels => ({
  cordels: [cordel],
  error: undefined,
  isLoading: false,
  isLoadingMore: false,
  isReachingEnd: false,
  loadMore: vi.fn(),
  retry: vi.fn(),
  ...overrides,
});

describe("Home pagination", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads more results from an accessible button", async () => {
    const result = paginatedResult();
    mockedUsePaginatedCordels.mockReturnValue(result);
    renderHome();

    await userEvent.click(screen.getByRole("button", { name: "Ver mais" }));

    expect(result.loadMore).toHaveBeenCalledTimes(1);
  });

  it("keeps the load-more button stable while the next page loads", () => {
    mockedUsePaginatedCordels.mockReturnValue(
      paginatedResult({ isLoadingMore: true })
    );
    renderHome();

    expect(
      screen.getByRole("button", { name: "Carregando..." })
    ).toBeDisabled();
  });

  it("hides pagination when the last page is reached", () => {
    mockedUsePaginatedCordels.mockReturnValue(
      paginatedResult({ isReachingEnd: true })
    );
    renderHome();

    expect(
      screen.queryByRole("button", { name: "Ver mais" })
    ).not.toBeInTheDocument();
  });

  it("shows an error message without removing loaded results", async () => {
    const result = paginatedResult({ error: new Error("request failed") });
    mockedUsePaginatedCordels.mockReturnValue(result);
    renderHome();

    expect(screen.getByText("A chegada")).toBeInTheDocument();
    expect(
      screen.getByText("Não foi possível carregar os cordéis.")
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "Tentar novamente" })
    );
    expect(result.retry).toHaveBeenCalledTimes(1);
  });

  it("starts a new paginated search when the title changes", async () => {
    mockedUsePaginatedCordels.mockReturnValue(paginatedResult());
    renderHome();

    await userEvent.type(
      screen.getByRole("textbox", { name: "Pesquisar cordel" }),
      "Romance"
    );

    expect(mockedUsePaginatedCordels).toHaveBeenLastCalledWith("Romance");
  });
});
