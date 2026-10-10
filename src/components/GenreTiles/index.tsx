import { AutoStoriesOutlined } from "@mui/icons-material";
import { Button, Grid, Stack, Typography } from "@mui/material";

type GenreTilesProps = {
  genres: string[];
  selectedGenre?: string;
  onSelect: (genre?: string) => void;
};

export default function GenreTiles({ genres, selectedGenre, onSelect }: GenreTilesProps) {
  if (genres.length === 0) {
    return null;
  }

  return (
    <Stack spacing={2} sx={{ mt: 6 }}>
      <Typography variant="h3">Gêneros Populares</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} md={3}>
          <Button
            fullWidth
            variant={!selectedGenre ? "contained" : "outlined"}
            onClick={() => onSelect(undefined)}
          >
            Todos
          </Button>
        </Grid>
        {genres.map((genre) => (
          <Grid key={genre} item xs={6} sm={4} md={3}>
            <Button
              fullWidth
              variant={selectedGenre === genre ? "contained" : "outlined"}
              startIcon={<AutoStoriesOutlined />}
              onClick={() => onSelect(genre)}
            >
              {genre}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}