import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router";
import { CordelSummary } from "../../types";

interface CordelCardProps {
  cordel: CordelSummary;
}

export default function CordelCard({cordel}: CordelCardProps) {
  const navigate = useNavigate();

  const handleCordel = () => {
    navigate(`/cordeis/${cordel.id}`);
  };

  return (
    <Card
      sx={{
        height: "100%"
      }}
    >
      <CardHeader  title={cordel.title} subheader={cordel.authorName} />
      <CardMedia
        sx={{
          paddingTop: "100%",
        }}
        image={cordel.xilogravuraUrl ? cordel.xilogravuraUrl : "/cover_not_found.png"}
        title="Image title"
      />
      <CardActions >
          <Button size="small" onClick={handleCordel}>
            Visualizar
          </Button>
      </CardActions>
    </Card>
  );
}
