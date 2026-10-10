import { Box, Card, CardActionArea, Chip, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CordelSummary } from "../../types";

type FeaturedCordelCardProps = {
  cordel: CordelSummary;
};

export default function FeaturedCordelCard({ cordel }: FeaturedCordelCardProps) {
  const navigate = useNavigate();
  const genre = cordel.tags?.[0];

  return (
    <Card sx={{ overflow: "hidden", border: "2px solid", borderColor: "text.primary" }}>
      <CardActionArea onClick={() => navigate(`/cordeis/${cordel.id}`)}>
        <Box
          sx={{
            minHeight: 300,
            display: "flex",
            alignItems: "end",
            p: 3,
            color: "common.white",
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,.72), rgba(0,0,0,.15)), url(${cordel.xilogravuraUrl || "/cover_not_found.png"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Stack spacing={1.5}>
            {genre ? <Chip label={genre} size="small" color="secondary" /> : null}
            <Typography variant="h2">{cordel.title}</Typography>
            <Typography variant="body1">{cordel.authorName}</Typography>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  );
}