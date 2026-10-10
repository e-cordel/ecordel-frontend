import { render, screen } from "@testing-library/react";
import * as hooks from "../../../../hooks/useAuth";
import Nav from "../index";
import { AuthContextData } from "../../../../contexts/AuthProvider";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("Nav component", () => {
  it("shows public links for anonymous users", () => {
    const authContext: AuthContextData = {
      user: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    };
    jest.spyOn(hooks, "useAuth").mockImplementation(() => authContext);

    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: "Início" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Autores" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sobre" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Revisão de Cordéis" })).not.toBeInTheDocument();
  });

  it("shows review link when user is logged in", () => {
    const authContext: AuthContextData = {
      user: {
        username: "username",
      },
      signIn: jest.fn(),
      signOut: jest.fn(),
    };
    jest.spyOn(hooks, "useAuth").mockImplementation(() => authContext);

    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: "Revisão de Cordéis" })).toBeInTheDocument();
  });
});