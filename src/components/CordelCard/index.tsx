import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { CordelSummary } from "../../types";

interface CordelCardProps {
  cordel: CordelSummary;
}

export default function CordelCard({ cordel }: CordelCardProps) {
  const navigate = useNavigate();

  const handleCordel = () => {
    navigate(`/cordeis/${cordel.id}`);
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}>
      <CardMedia
        component="img"
        image={cordel.xilogravuraUrl || "/cover_not_found.png"}
        alt={cordel.xilogravuraDescription || `Capa do cordel: ${cordel.title}`}
        sx={{ height: 220, objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={1}>
          {cordel.tags?.[0] ? <Chip label={cordel.tags[0]} size="small" color="secondary" /> : null}
          <Typography variant="h4">{cordel.title}</Typography>
          <Typography variant="body2" color="text.secondary">{cordel.authorName}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleCordel}>
          Visualizar
        </Button>
      </CardActions>
    </Card>
  );
}