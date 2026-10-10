import { Container, Typography } from "@mui/material";

export default function Privacy() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h1" gutterBottom>Política de Privacidade</Typography>
      <Typography variant="body1">
        Utilizamos dados mínimos para manter a operação da plataforma e melhorar a experiência de leitura. Esta página será atualizada com os detalhes oficiais de coleta e tratamento.
      </Typography>
    </Container>
  );
}