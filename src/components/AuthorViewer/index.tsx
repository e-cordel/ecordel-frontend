import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PersonOutline, ShareOutlined } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { CordelGridViewer } from "../CordelGridViewer";
import { Author, CordelSummary } from "../../types";

type AuthorViewerProps = {
  author: Author;
  cordels: CordelSummary[];
};

type SortBy = "title" | "year";

export const AuthorViewer = ({ author, cordels }: AuthorViewerProps) => {
  const [sortBy, setSortBy] = useState<SortBy>("title");
  const [tag, setTag] = useState<string>("all");

  const tags = useMemo(
    () => [...new Set(cordels.flatMap((cordel) => cordel.tags || []))],
    [cordels]
  );

  const filteredCordels = useMemo(() => {
    const list = tag === "all"
      ? cordels
      : cordels.filter((cordel) => (cordel.tags || []).includes(tag));

    return [...list].sort((a, b) => {
      if (sortBy === "year") {
        return (b.year || 0) - (a.year || 0);
      }

      return a.title.localeCompare(b.title, "pt-BR");
    });
  }, [cordels, sortBy, tag]);

  const handleShare = async () => {
    const shareData = {
      title: `Autor: ${author.name || "Sem nome"}`,
      text: author.about || "Conheça os cordéis deste autor no E-Cordel.",
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Avatar sx={{ width: 96, height: 96 }}>
            <PersonOutline fontSize="large" />
          </Avatar>
          <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
            <Typography variant="h1">{author.name}</Typography>
            <Typography variant="body1" sx={{ borderLeft: "4px solid", borderColor: "primary.main", pl: 2 }}>
              {author.about || "Biografia não informada."}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" startIcon={<ShareOutlined />} onClick={handleShare}>Compartilhar</Button>
            </Stack>
          </Stack>
        </Stack>

        <Divider />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            select
            label="Ordenação"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortBy)}
            sx={{ minWidth: 220 }}
          >
            <MenuItem value="title">Título (A-Z)</MenuItem>
            <MenuItem value="year">Ano (mais recente)</MenuItem>
          </TextField>
          <TextField
            select
            label="Filtro por gênero"
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            sx={{ minWidth: 220 }}
          >
            <MenuItem value="all">Todos</MenuItem>
            {tags.map((itemTag) => (
              <MenuItem key={itemTag} value={itemTag}>{itemTag}</MenuItem>
            ))}
          </TextField>
        </Stack>

        <Box>
          <Typography variant="h3">Cordéis deste autor</Typography>
          <CordelGridViewer cordels={filteredCordels} />
        </Box>
      </Stack>
    </Container>
  );
};

export const AuthorViewerSkeleton = () => (
  <Container component="main" maxWidth="lg" sx={{ mt: 3, mb: 6 }}>
    <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
      <Box sx={{ width: 96, height: 96, borderRadius: "50%", bgcolor: "action.hover" }} />
      <Stack spacing={1} sx={{ flexGrow: 1 }}>
        <Box sx={{ width: 300, height: 44, bgcolor: "action.hover" }} />
        <Box sx={{ width: 180, height: 20, bgcolor: "action.hover" }} />
        <Box sx={{ width: "100%", height: 72, bgcolor: "action.hover" }} />
      </Stack>
    </Stack>
  </Container>
);