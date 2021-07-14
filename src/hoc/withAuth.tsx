import { useAuth } from "../hooks/useAuth";
import Login from "../pages/login";

const withAuth = Component => {
  const Auth = (props) => {
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