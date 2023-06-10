import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { FiSun, FiMoon } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useColorMode } from "../../hooks/useColorMode";
import { AuthButton } from "../AuthButton";
import Nav from "./Nav";
import { theme } from "../../theme";

export default function Navbar() {

  const { mode, toggleColorMode } = useColorMode();
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Container>
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              <Button color="inherit" href="/" LinkComponent={Link}>e-cordel</Button>
            </Typography>
            
            <Nav />
            <IconButton color="inherit" onClick={toggleColorMode}>
              {mode === "dark" ? <FiSun /> : <FiMoon />}
            </IconButton>
            <AuthButton />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
