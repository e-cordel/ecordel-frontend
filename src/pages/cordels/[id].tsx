import { Container, Grid, makeStyles, Paper } from "@material-ui/core";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";

interface CordelType {
  id: number;
  author: {
    id: number;
    name: string;
    about: string;
    email: string;
  }
  title: string;
  content: string;
  xilogravura: {
    url: string;
    description: string;
    xilografo: string;
  };
  description: string;
  tags: string[];
}

export default function Cordel() {

  const classes = useStyles();
  const router = useRouter();
  const { id } = useMemo(() => router.query, [router]);
  const { data } = useFetch<CordelType>(`cordels/${id}`);

  const getTextPages = (content: string, lineCount = 25) => {
    const lines: string[] = !content ? [] : content.split('\n');
    let pages = [];
    lines.forEach((line, index) => {
      const page = Math.floor(index / lineCount);
      !pages[page] ? pages[page] = [line] : pages[page].push(line)
    })
    return pages;
  }

  return (
    <Container className={classes.cardGrid}>
      <Grid container
        className={classes.rootGrid}
        spacing={4}
      >
        <Grid item md={6} sm={8} xs={12}
          className={classes.gridChild}
        >
          <Paper
            className={classes.virtualPage}
            elevation={5}
          >
            <img
              src={data?.xilogravura?.url ? data?.xilogravura?.url : '/cover_not_found.png'}
              alt={data?.title}
              className={classes.img}
            />
            <h3>{data?.title}</h3>
            <h4>{data?.author.name}</h4>
          </Paper>
        </Grid>

        {data && getTextPages(data.content, 25).map((page, pageIndex) => (
          <Grid item md={6} sm={8} xs={12}
            className={classes.gridChild}
            key={`page-${pageIndex}`}>
            <Paper
              className={classes.virtualPage}
              elevation={5}
            >
              <div className={classes.pageContent} >
                {page.map((line, index) => (
                  <span key={`page-${pageIndex}-${index}`} > {line} <br />
                  </span>
                ))}
              </div>
              <span className={classes.pageNumber}>{pageIndex+1}</span>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container >

  )
}


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  rootGrid: {
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
    flexGrow: 1,
  },
  gridChild: {
    // width: '100%',
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  virtualPage: {
    // margin: '1rem',
    padding: '4vw',
    [theme.breakpoints.up('sm')]: {
      padding: '2rem',
    },
    height: '630px',
    maxWidth: '480px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    cover: {
      alignItems: 'center',
    },
    margin: 'auto',
  },
  pageContent: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  img: {
    width: '100%',
    maxHeight: '80%',
    objectFit: 'cover',
  }, 
  pageNumber: {
    marginLeft: 'auto'
  }
}));