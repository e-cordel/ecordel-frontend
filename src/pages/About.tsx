import { Container, Typography } from "@mui/material";

export default function About() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h1" gutterBottom>Sobre o E-Cordel</Typography>
      <Typography variant="body1">
        O E-Cordel preserva e amplia o acesso ao patrimônio da literatura de cordel por meio de uma experiência digital simples, acessível e aberta ao público.
      </Typography>
    </Container>
  );
}