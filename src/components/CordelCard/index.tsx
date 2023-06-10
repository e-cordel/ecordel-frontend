import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router";

interface CordelCardProps {
  id: number;
  title: string;
  authorName: string;
  xilogravuraUrl: string;
  authorId: number;
}

export default function CordelCard({
  id,
  title,
  authorName,
  authorId,
  xilogravuraUrl,
}: CordelCardProps) {
  const router = useHistory();

  const handleCordel = () => {
    router.push(`/cordeis/${id}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        sx={{
          paddingTop: "100%",
        }}
        image={xilogravuraUrl ? xilogravuraUrl : "/cover_not_found.png"}
        title="Image title"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="subtitle1" component="h2">
          {title}
        </Typography>
        <Typography variant="subtitle2">
          <Link href={`/autores/${authorId}`} underline="none">{authorName}</Link>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleCordel}>
          Visualizar
        </Button>
      </CardActions>
    </Card>
  );
}
