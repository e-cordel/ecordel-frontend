import { Container, Typography } from "@mui/material";

export default function Terms() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h1" gutterBottom>Termos de Uso</Typography>
      <Typography variant="body1">
        Ao acessar o E-Cordel, você concorda com o uso da plataforma para leitura, descoberta e valorização de obras cadastradas conforme as regras editoriais do acervo.
      </Typography>
    </Container>
  );
}