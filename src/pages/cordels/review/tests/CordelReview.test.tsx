import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import CordelReview from "../CordelReview";
import api from "../../../../services/api";

const mockAddToast = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../../../../services/api");

vi.mock("../../../../hooks/useToast", () => ({
  useToast: () => ({
    addToast: mockAddToast,
  }),
}));

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: "/revisao/1" }),
    useParams: () => ({ id: "1" }),
  };
});

const mockedApi = vi.mocked(api);

const cordelMock = {
  id: "1",
  title: "Cordel de Teste",
  year: 2020,
  author: { id: 10, name: "Autor" },
  description: "descricao",
  content: "Texto original",
  published: false,
  tags: ["teste"],
  featured: true,
  xilogravura: {
    id: 1,
    url: "https://example.com/xilo.jpg",
    title: "Xilo",
    description: "Descricao da xilo",
  },
  ebookUrl: "",
  source: "",
};

describe("CordelReview page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("loads and renders cordel fields", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: cordelMock } as any);

    render(
      <MemoryRouter>
        <CordelReview />
      </MemoryRouter>
    );

    expect(await screen.findByDisplayValue("Cordel de Teste")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Texto original")).toBeInTheDocument();
    expect(document.title).toContain("Cordel de Teste");
  });

  it("fetches AI review result from location endpoint and replaces content", async () => {
    mockedApi.get
      .mockResolvedValueOnce({ data: cordelMock } as any)
      .mockResolvedValueOnce({ status: 200, data: { content: "Texto revisado" } } as any);

    mockedApi.post.mockResolvedValueOnce({
      status: 202,
      headers: { location: "/ai-reviews/123" },
    } as any);

    render(
      <MemoryRouter>
        <CordelReview />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Texto original");

    fireEvent.click(screen.getByRole("button", { name: "Revisar texto com IA" }));

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith(
        expect.stringContaining("/ai-reviews/123"),
        expect.objectContaining({ validateStatus: expect.any(Function) })
      );
    });

    expect(mockedApi.post).toHaveBeenCalledWith(
      "cordels/1/ai-reviews",
      undefined,
      expect.objectContaining({ validateStatus: expect.any(Function) })
    );

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith({ message: "Texto revisado com IA!", type: "success" });
    });
  });

  it("shows an error toast when AI review request fails", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: cordelMock } as any);
    mockedApi.post.mockRejectedValueOnce(new Error("request failed"));

    render(
      <MemoryRouter>
        <CordelReview />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Texto original");

    fireEvent.click(screen.getByRole("button", { name: "Revisar texto com IA" }));

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: "error" })
      );
    });

    expect(screen.getByRole("button", { name: "Revisar texto com IA" })).toBeEnabled();
  });
});