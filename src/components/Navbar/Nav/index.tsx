import { Button, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const links = [
  { label: "Início", href: "/" },
  { label: "Autores", href: "/autores" },
  { label: "Sobre", href: "/sobre" },
];

export default function Nav() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={1} alignItems="center" component="nav">
      {links.map((link) => {
        const active = location.pathname === link.href;
        return (
          <Button
            key={link.href}
            color="inherit"
            onClick={() => navigate(link.href)}
            sx={{
              borderBottom: active ? "2px solid currentColor" : "2px solid transparent",
              borderRadius: 0,
              px: 1,
            }}
          >
            {link.label}
          </Button>
        );
      })}
      {user ? (
        <Button color="inherit" onClick={() => navigate("/revisao")}>Revisão de Cordéis</Button>
      ) : null}
    </Stack>
  );
}