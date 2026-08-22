import { TextDecreaseOutlined, TextIncreaseOutlined } from "@mui/icons-material";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";

type ReadingPreferencesProps = {
  fontScale: number;
  onDecreaseFont: () => void;
  onIncreaseFont: () => void;
  readingMode: "full" | "paginated";
  onToggleReadingMode: () => void;
};

export default function ReadingPreferences({
  fontScale,
  onDecreaseFont,
  onIncreaseFont,
  readingMode,
  onToggleReadingMode,
}: ReadingPreferencesProps) {
  return (
    <Stack spacing={3} sx={{ position: { md: "sticky" }, top: { md: 96 } }}>
      <Stack spacing={1}>
        <Typography variant="h4">Tamanho da fonte</Typography>
        <ButtonGroup aria-label="Ajustar fonte" variant="outlined">
          <Button onClick={onDecreaseFont} aria-label="Reduzir fonte"><TextDecreaseOutlined /></Button>
          <Button disabled>{Math.round(fontScale * 100)}%</Button>
          <Button onClick={onIncreaseFont} aria-label="Aumentar fonte"><TextIncreaseOutlined /></Button>
        </ButtonGroup>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="h4">Modo de leitura</Typography>
        <Button variant="outlined" onClick={onToggleReadingMode}>
          {readingMode === "full" ? "Modo paginado" : "Texto completo"}
        </Button>
      </Stack>
    </Stack>
  );
}