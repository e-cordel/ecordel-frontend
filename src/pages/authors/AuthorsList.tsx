import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Edit as EditIcon, PersonOutline, SearchOutlined } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StructuralNavigation } from "../../components/StructuralNavigation";
import { useAuth } from "../../hooks/useAuth";
import { usePaginatedAuthors } from "../../hooks/usePaginatedAuthors";
import { userIsAdmin } from "../../contexts/AuthProvider";

const AuthorsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchName, setSearchName] = useState("");

  const {
    authors,
    error,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    loadMore,
    retry,
  } = usePaginatedAuthors(searchName);

  const isAdmin = userIsAdmin(user);

  const visibleAuthors = useMemo(() => authors || [], [authors]);

  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8} xl={10}>
          <StructuralNavigation path={location.pathname} title="Autores" />
        </Grid>
        <Grid item xs={12} md={4} xl={2}>
          {isAdmin ? (
            <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
              <Link to="/autores/novo">Novo Autor</Link>
            </Box>
          ) : null}
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <OutlinedInput
          fullWidth
          startAdornment={
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          }
          value={searchName}
          onChange={(event) => setSearchName(event.target.value)}
          inputProps={{ "aria-label": "Pesquisar autor" }}
          placeholder="Pesquisar autor"
        />
      </Box>

      <Grid container spacing={3} sx={{ pt: 3 }} aria-busy={isLoading || isLoadingMore}>
        {visibleAuthors.map((author) => (
          <Grid item key={author.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack spacing={1.5}>
                  <Avatar sx={{ width: 56, height: 56 }}>
                    <PersonOutline />
                  </Avatar>
                  <Typography variant="h4">{author.name || "Autor sem nome"}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {author.about || "Biografia nao informada."}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {author.email || "E-mail nao informado"}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <Button onClick={() => navigate(`/autores/${author.id}`)}>Ver detalhes</Button>
                {isAdmin ? (
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/autores/editar/${author.id}`)}
                    aria-label={`Editar autor ${author.name || author.id}`}
                  >
                    Editar
                  </Button>
                ) : null}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

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
          Não foi possivel carregar os autores.
        </Alert>
      ) : null}

      {!error && visibleAuthors.length > 0 && !isReachingEnd ? (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }} aria-live="polite">
          <Button type="button" variant="contained" onClick={loadMore} disabled={isLoadingMore}>
            {isLoadingMore ? "Carregando..." : "Ver mais"}
          </Button>
        </Box>
      ) : null}
    </Container>
  );
};

export default AuthorsList;

