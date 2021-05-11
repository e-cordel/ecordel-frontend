import { useState } from "react";
import { useRouter } from 'next/router'
import { useFetch } from "../hooks/useFetch";
import Hero from "../components/Hero";
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, makeStyles, Typography } from "@material-ui/core";

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

  const [searchTitle, setSearchTitle] = useState('');

  const router = useRouter();

  const { data } = useFetch<CordelRequest>(`cordels?title=${searchTitle}`);

  const classes = useStyles();

  return (
    <>
      <Hero
        title="Bem vindo"
        text="Quer contribuir ou conhecer mais sobre o projeto e-cordel?
        visite nossa pagina e saba mais."
        actionText="Visite nosso site"
        action={() => router.push('https://ecordel.com.br/')}
      />
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {data?.content.map(({ id, title, xilogravuraUrl, authorName }: Cordel) => (
            <Grid item key={id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={xilogravuraUrl ? xilogravuraUrl : "/cover_not_found.png"}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {title}
                  </Typography>
                  <Typography>
                    {authorName}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                    </Button>
                  <Button size="small" color="primary">
                    Edit
                    </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* <div>
        <div >
          <input type="text"
            placeholder="Buscar cordel"
            value={searchTitle}
            onChange={e => setSearchTitle(e.target.value)}
          />
        </div> */}

    </>
  )
}


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));