import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography
} from "@material-ui/core";
import { useRouter } from "next/router";

interface CordelCardProps {
  id: number;
  title: string;
  authorName: string;
  xilogravuraUrl: string;
}

export default function CordelCard({ id, title, authorName, xilogravuraUrl }: CordelCardProps) {
  const router = useRouter();
  const classes = useStyles();

  const handleCordel = (e) => {
    router.push(`cordels/${id}`);
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={xilogravuraUrl ? xilogravuraUrl : "/cover_not_found.png"}
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="subtitle1" component="h2">
          {title}
        </Typography>
        <Typography variant="subtitle2" component="h3">
          {authorName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={handleCordel}
        >
          Visualizar
        </Button>
      </CardActions>
    </Card >
  )
}



const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));