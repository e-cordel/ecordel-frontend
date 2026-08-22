import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import FeaturedCordelCard from "../components/FeaturedCordelCard";
import GenreTiles from "../components/GenreTiles";
import { CordelGridViewer } from "../components/CordelGridViewer";
import { usePaginatedCordels } from "../hooks/usePaginatedCordels";

export default function Home() {
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>();

  const {
    cordels,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
    retry,
  } = usePaginatedCordels(searchTitle);

  const featuredCordels = useMemo(() => {
    if (!cordels || cordels.length === 0) {
      return [];
    }

    const featured = cordels.filter((cordel) => cordel.featured);
    return (featured.length > 0 ? featured : cordels).slice(0, 3);
  }, [cordels]);

  const genres = useMemo(
    () =>
      [...new Set((cordels || []).flatMap((cordel) => cordel.tags || []))]
        .filter(Boolean)
        .slice(0, 8),
    [cordels]
  );

  const filteredCordels = useMemo(() => {
    if (!selectedGenre) {
      return cordels;
    }

    return (cordels || []).filter((cordel) => (cordel.tags || []).includes(selectedGenre));
  }, [cordels, selectedGenre]);

  return (
    <Container sx={{ py: 6 }}>
      <Stack spacing={2} sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h1">Descubra a riqueza do cordel</Typography>
        <Typography variant="body1">Explore autores, temas e histórias em um acervo digital brasileiro.</Typography>
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ maxWidth: 760, mx: "auto", mb: 6 }}>
        <OutlinedInput
          fullWidth
          startAdornment={
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          }
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          inputProps={{ "aria-label": "Pesquisar cordel" }}
          placeholder="Pesquisar cordel"
        />
        <Button variant="contained" disableElevation>Buscar</Button>
      </Stack>

      {featuredCordels.length > 0 ? (
        <Stack spacing={2}>
          <Typography variant="h3">Destaques do Acervo</Typography>
          <FeaturedCordelCard cordel={featuredCordels[0]} />
        </Stack>
      ) : null}

      <GenreTiles genres={genres} selectedGenre={selectedGenre} onSelect={setSelectedGenre} />

      <CordelGridViewer
        cordels={filteredCordels}
        loading={isLoading || isLoadingMore}
      />

      {error ? (
        <Alert
          severity="error"
          sx={{ mt: 4 }}
          action={
            <Button color="inherit" size="small" onClick={retry}>
              Tentar novamente
            </Button>
          }
        >
          Não foi possível carregar os cordéis.
        </Alert>
      ) : null}

      {!error && cordels && !isReachingEnd ? (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }} aria-live="polite">
          <Button
            type="button"
            variant="contained"
            onClick={loadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Carregando..." : "Ver mais"}
          </Button>
        </Box>
      ) : null}
    </Container>
  );
}