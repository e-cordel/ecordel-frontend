import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import { FiSun, FiMenu, FiMoon } from "react-icons/fi";
import { useColorMode } from "../../hooks/useColorMode";
import { AuthButton } from "../AuthButton";

export default function Navbar() {
  const theme = useTheme();
  const { mode, toggleColorMode } = useColorMode();

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              marginRight: theme.spacing(2),
            }}
          >
            <FiMenu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            e-cordel
          </Typography>
          <IconButton color="inherit" onClick={toggleColorMode}>
            {mode === "dark" ? <FiSun /> : <FiMoon />}
          </IconButton>
          <AuthButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}
