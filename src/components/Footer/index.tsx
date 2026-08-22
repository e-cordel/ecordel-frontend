import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 2, mt: "auto" }}>
      <Container>
        <Typography variant="caption" color="text.secondary" align="center" component="p">
          v{__APP_VERSION__}
        </Typography>
      </Container>
    </Box>
  );
}
