import { Navigate } from "react-router-dom";
import { userIsAdmin } from "../contexts/AuthProvider";
import { useAuth } from "../hooks/useAuth";

interface RouteProps {
  children: JSX.Element;
}

export const RequireAdmin = ({ children }: RouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return userIsAdmin(user) ? children : <Navigate to="/autores" />;
};

