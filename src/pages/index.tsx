import { useState } from "react";
import { useRouter } from 'next/router'
import { Container, Grid, InputAdornment, makeStyles, OutlinedInput } from "@material-ui/core";
import { useFetch } from "../hooks/useFetch";
import Hero from "../components/Hero";
import CardCordel from '../components/CordelCard';
import { CordelCardSkeleton } from '../components/CordelCard/CordelCardSkeleton';
import { FiSearch } from "react-icons/fi";

interface Cordel {
  id: number;
  title: string;
  xilogravuraUrl: string;
  authorName: string;
}

interface CordelRequest {
  content: Cordel[];
}

export default function Home() {
  const router = useRouter();
  const classes = useStyles();
  const [searchTitle, setSearchTitle] = useState('');

  const { data } = useFetch<CordelRequest>(`cordels?title=${searchTitle}`);

  return (
    <>
      <Hero
        title="Bem vindo"
        text="Quer contribuir ou conhecer mais sobre o projeto e-cordel?
        visite nossa pagina e saiba mais."
        actionText="Visite nosso site"
        action={() => router.push('https://ecordel.com.br/')}
      />
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <OutlinedInput
              fullWidth
              startAdornment={
                <InputAdornment position="start" variant="outlined" >
                  <FiSearch />
                </InputAdornment>
              }
              value={searchTitle}
              onChange={e => setSearchTitle(e.target.value)}
            />
          </Grid>
          {data ?
            data?.content.map(({ id, title, xilogravuraUrl, authorName }: Cordel) => (
              <Grid item key={id} xs={12} sm={6} md={4}>
                <CardCordel
                  id={id}
                  title={title}
                  xilogravuraUrl={xilogravuraUrl}
                  authorName={authorName}
                ></CardCordel>
              </Grid>
            ))
            : (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <CordelCardSkeleton />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CordelCardSkeleton />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CordelCardSkeleton />
                </Grid>
              </>
            )
          }
        </Grid>
      </Container>
    </>
  )
}


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));