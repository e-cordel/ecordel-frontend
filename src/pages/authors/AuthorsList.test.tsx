import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import AuthorsList from "./AuthorsList";
import { usePaginatedAuthors } from "../../hooks/usePaginatedAuthors";
import { useAuth } from "../../hooks/useAuth";

vi.mock("../../hooks/usePaginatedAuthors");
vi.mock("../../hooks/useAuth");

const mockedUsePaginatedAuthors = vi.mocked(usePaginatedAuthors);
const mockedUseAuth = vi.mocked(useAuth);

const authors = [
  { id: 1, name: "Patativa", about: "Poeta", email: "patativa@ecordel.com" },
];

const paginatedResult = (overrides: Partial<ReturnType<typeof usePaginatedAuthors>> = {}) => ({
  authors,
  error: undefined,
  isLoading: false,
  isLoadingMore: false,
  isReachingEnd: false,
  loadMore: vi.fn(),
  retry: vi.fn(),
  ...overrides,
});

const renderPage = () =>
  render(
    <MemoryRouter>
      <AuthorsList />
    </MemoryRouter>
  );

describe("AuthorsList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("hides admin actions for non-admin users", () => {
    mockedUseAuth.mockReturnValue({
      user: { username: "reader" },
      signIn: vi.fn(),
      signOut: vi.fn(),
    });
    mockedUsePaginatedAuthors.mockReturnValue(paginatedResult());

    renderPage();

    expect(screen.getByText("Patativa")).toBeInTheDocument();
    expect(screen.queryByText("Novo Autor")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Editar/i })).not.toBeInTheDocument();
  });

  it("shows admin actions for admin users", () => {
    mockedUseAuth.mockReturnValue({
      user: { username: "admin", role: "ADMIN" },
      signIn: vi.fn(),
      signOut: vi.fn(),
    });
    mockedUsePaginatedAuthors.mockReturnValue(paginatedResult());

    renderPage();

    expect(screen.getByText("Novo Autor")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Editar/i })).toBeInTheDocument();
  });

  it("loads more authors from button", async () => {
    const result = paginatedResult();
    mockedUseAuth.mockReturnValue({
      user: { username: "reader" },
      signIn: vi.fn(),
      signOut: vi.fn(),
    });
    mockedUsePaginatedAuthors.mockReturnValue(result);

    renderPage();
    await userEvent.click(screen.getByRole("button", { name: "Ver mais" }));

    expect(result.loadMore).toHaveBeenCalledTimes(1);
  });

  it("updates search and re-runs author query", async () => {
    mockedUseAuth.mockReturnValue({
      user: { username: "reader" },
      signIn: vi.fn(),
      signOut: vi.fn(),
    });
    mockedUsePaginatedAuthors.mockReturnValue(paginatedResult());

    renderPage();
    await userEvent.type(screen.getByRole("textbox", { name: "Pesquisar autor" }), "Pat");

    expect(mockedUsePaginatedAuthors).toHaveBeenLastCalledWith("Pat");
  });
});

