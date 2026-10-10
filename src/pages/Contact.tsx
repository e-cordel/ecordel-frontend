import { Container, Link, Typography } from "@mui/material";

export default function Contact() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h1" gutterBottom>Contato</Typography>
      <Typography variant="body1">
        Dúvidas, sugestões e parcerias podem ser enviadas para <Link href="mailto:contato@ecordel.com.br">contato@ecordel.com.br</Link>.
      </Typography>
    </Container>
  );
}