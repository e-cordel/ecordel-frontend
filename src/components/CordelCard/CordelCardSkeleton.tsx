import { Card, CardActions, CardContent, makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export function CordelCardSkeleton() {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <Skeleton variant="rect" width="100%" height="50%" />
      <CardContent className={classes.cardContent}>
        <Skeleton />
        <Skeleton width="60%" />
        <Skeleton />
      </CardContent>
      <CardActions>
        <Skeleton variant="rect" width="4rem" height="2rem" />
      </CardActions>
    </Card >
  )
}
const useStyles = makeStyles((theme) => ({
  card: {
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
}));