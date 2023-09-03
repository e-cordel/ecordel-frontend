import { render, screen } from "@testing-library/react";
import * as hooks from "../../../../hooks/useAuth";
import Nav from "../index";
import { AuthContextData } from "../../../../contexts/AuthProvider";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";

describe("Nav component", () => {
  it("should render review and authors button if user is loggedin", () => {
    const authContext: AuthContextData = {
      user: {
        username: "username"
      },
      signIn: jest.fn(),
      signOut: jest.fn()
    };
    jest.spyOn(hooks, 'useAuth').mockImplementation( () => authContext );

    render(
      <BrowserRouter>
      <Nav />
      </BrowserRouter>
    );
    
    const autoresButton = screen.getByText('Autores');
    const reviewButton = screen.getByText('Revisão de Cordéis');
    expect(autoresButton).toBeInTheDocument();
    expect(reviewButton).toBeInTheDocument();
  });
});

