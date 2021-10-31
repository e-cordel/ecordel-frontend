import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

export const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  if (!isPrivate)
    return <ReactDOMRoute {...rest} render={() => <Component />} />;

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return !!user ? <Component /> : <Redirect to={"/login"} />;
      }}
    />
  );
};
