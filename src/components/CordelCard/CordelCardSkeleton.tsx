import { Card, CardActions, CardContent, Skeleton } from "@material-ui/core";

export function CordelCardSkeleton() {
  return (
    <Card
      sx={{
        height: "300px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Skeleton variant="rectangular" width="100%" height="50%" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton />
        <Skeleton width="60%" />
        <Skeleton />
      </CardContent>
      <CardActions>
        <Skeleton variant="rectangular" width="4rem" height="2rem" />
      </CardActions>
    </Card>
  );
}
