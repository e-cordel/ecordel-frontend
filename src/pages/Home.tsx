import { useState } from "react";
import {
  Container,
  Grid,
  InputAdornment,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import { useFetch } from "../hooks/useFetch";
import Hero from "../components/Hero";
import { FiSearch } from "react-icons/fi";
import {CordelGridViewer} from "../components/CordelGridViewer";
import { CordelSummary } from "../types";

interface CordelRequest {
  content: CordelSummary[];
}

export default function Home() {
  const theme = useTheme();
  const [searchTitle, setSearchTitle] = useState("");

  const { data } = useFetch<CordelRequest>(
    `cordels/summaries?title=${searchTitle}&published`
  );

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
            />
          </Grid>
        </Grid>
        <CordelGridViewer cordels={data?.content} />
      </Container>
    </>
  );
}
