import { Card, CardActions, CardContent, Skeleton } from "@mui/material";

export function CordelCardSkeleton() {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Skeleton variant="rectangular" width="100%" height={220} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton width="35%" />
        <Skeleton />
        <Skeleton width="60%" />
      </CardContent>
      <CardActions>
        <Skeleton variant="rounded" width="6rem" height="2rem" />
      </CardActions>
    </Card>
  );
}