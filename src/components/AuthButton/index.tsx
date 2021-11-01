import { Button, useTheme } from "@material-ui/core";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function AuthButton() {
  const history = useHistory();
  const { user, signOut } = useAuth();
  const theme = useTheme();

  const login = () => {
    history.push("/login");
  };

  const logout = () => {
    signOut();
    history.push("/");
  };

  if (!user)
    return (
      <Button
        color="inherit"
        endIcon={<FiLogIn />}
        onClick={login}
        sx={{ marginLeft: theme.spacing(2) }}
      >
        Login
      </Button>
    );

  return (
    <Button
      color="inherit"
      endIcon={<FiLogOut />}
      onClick={logout}
      sx={{ marginLeft: theme.spacing(2) }}
    >
      Logout
    </Button>
  );
}
