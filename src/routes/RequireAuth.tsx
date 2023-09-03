import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface RouteProps {
  children: JSX.Element;
}

export const RequireAuth = ({ children }: RouteProps) => {
  const { user } = useAuth();
  let isAuthenticated = !!user;
  return isAuthenticated ? children : <Navigate to={"/login"} />;
}
