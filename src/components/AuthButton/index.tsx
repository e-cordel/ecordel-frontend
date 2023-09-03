import { Button, useTheme } from "@mui/material";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function AuthButton() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const theme = useTheme();

  const login = () => {
    navigate("/login");
  };

  const logout = () => {
    signOut();
    navigate("/");
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
