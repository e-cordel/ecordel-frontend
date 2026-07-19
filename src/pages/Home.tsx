import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import Hero from "../components/Hero";
import { FiSearch } from "react-icons/fi";
import {CordelGridViewer} from "../components/CordelGridViewer";
import { usePaginatedCordels } from "../hooks/usePaginatedCordels";

export default function Home() {
  const theme = useTheme();
  const [searchTitle, setSearchTitle] = useState("");

  const {
    cordels,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
    retry,
  } = usePaginatedCordels(searchTitle);

  return (
    <>
      <Hero
        title="Bem vindo"
        text="Quer contribuir ou conhecer mais sobre o projeto e-cordel?
        visite nossa pagina e saiba mais."
        actionText="Visite nosso site"
        action={() => (window.location.href = "https://ecordel.com.br/")}
      />
      <Container
        sx={{
          paddingTop: theme.spacing(4),
          paddingBottom: theme.spacing(4),
        }}
        maxWidth="md"
      >
        {/* End hero unit */}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <OutlinedInput
              fullWidth
              startAdornment={
                <InputAdornment position="start" variant="outlined">
                  <FiSearch />
                </InputAdornment>
              }
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              inputProps={{ "aria-label": "Pesquisar cordel" }}
              placeholder="Pesquisar cordel"
            />
          </Grid>
        </Grid>
        <CordelGridViewer
          cordels={cordels}
          loading={isLoading || isLoadingMore}
        />
        {error && (
          <Alert
            severity="error"
            sx={{ marginTop: theme.spacing(4) }}
            action={
              <Button color="inherit" size="small" onClick={retry}>
                Tentar novamente
              </Button>
            }
          >
            Não foi possível carregar os cordéis.
          </Alert>
        )}
        {!error && cordels && !isReachingEnd && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: theme.spacing(4),
            }}
            aria-live="polite"
          >
            <Button
              type="button"
              variant="contained"
              onClick={loadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? "Carregando..." : "Ver mais"}
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}
