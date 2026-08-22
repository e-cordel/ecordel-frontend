import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, mt: 6, borderTop: "1px solid", borderColor: "divider" }}>
      <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
        <Stack>
          <Typography variant="h4" color="primary.main">E-Cordel</Typography>
          <Typography variant="caption" color="text.secondary">© {new Date().getFullYear()} E-Cordel • v{__APP_VERSION__}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Link component={RouterLink} to="/sobre" underline="hover" color="inherit">Patrimônio Cultural</Link>
          <Link component={RouterLink} to="/privacidade" underline="hover" color="inherit">Privacidade</Link>
          <Link component={RouterLink} to="/termos" underline="hover" color="inherit">Termos</Link>
          <Link component={RouterLink} to="/contato" underline="hover" color="inherit">Contato</Link>
        </Stack>
      </Container>
    </Box>
  );
}