import {
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@material-ui/core";

interface HeroProps {
  title: string;
  text: string;
  actionText: string;
  action: () => void;
}

export default function Hero({ title, text, actionText, action }: HeroProps) {
  const theme = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          {text}
        </Typography>
        <Container sx={{ marginTop: theme.spacing(4) }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" color="primary" onClick={action}>
                {actionText}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </div>
  );
}
