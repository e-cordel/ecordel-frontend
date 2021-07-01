import { Button, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHeroStyles } from "./useHeroStyles";

interface HeroProps {
  title: string;
  text: string;
  actionText: string;
  action: () => {};
}

export default function Hero({ title, text, actionText, action }: HeroProps) {

  const classes = useHeroStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          {text}
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={action}
              >
                {actionText}
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}