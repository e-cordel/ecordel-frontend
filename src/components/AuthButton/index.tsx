import { Button, useTheme } from "@mui/material";
import { LoginOutlined, LogoutOutlined } from "@mui/icons-material";
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
        endIcon={<LoginOutlined />}
        onClick={login}
        sx={{ marginLeft: theme.spacing(1) }}
      >
        Login
      </Button>
    );

  return (
    <Button
      color="inherit"
      endIcon={<LogoutOutlined />}
      onClick={logout}
      sx={{ marginLeft: theme.spacing(1) }}
    >
      Logout
    </Button>
  );
}