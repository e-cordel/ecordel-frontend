import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../hooks/Auth";
import Login from "../pages/login";

const withAuth = Component => {
  const Auth = (props) => {
    const router = useRouter()
    const { user } = useAuth();

    if (!user) {
      return (
        <Login />
      );

    }

    return (
      <Component {...props} />
    );
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;