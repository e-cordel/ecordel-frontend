import {
  AppBar,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useColorMode } from "../../hooks/useColorMode";
import { AuthButton } from "../AuthButton";
import Nav from "./Nav";

export default function Navbar() {
  const navigate = useNavigate();
  const { mode, toggleColorMode } = useColorMode();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: mode === "dark" ? "rgba(51, 48, 39, 0.92)" : "rgba(255, 253, 245, 0.92)",
        color: "text.primary",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container>
        <Toolbar sx={{ justifyContent: "space-between", gap: 2, py: 1 }}>
          <Typography variant="h4" color="primary.main">
            <Button color="inherit" onClick={() => navigate("/")} sx={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit" }}>
              E-Cordel
            </Button>
          </Typography>
          <Nav />
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton color="inherit" aria-label="Ir para início" onClick={() => navigate("/")}>
              <SearchOutlined />
            </IconButton>
            <IconButton color="inherit" onClick={toggleColorMode} aria-label="Alterar esquema de cores">
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>
            <AuthButton />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}