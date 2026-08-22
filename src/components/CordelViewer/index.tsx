import {
  Box,
  Button,
  ButtonGroup,
  Container,
  LinearProgress,
  Link,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Cordel } from "../../types";
import api from "../../services/api";
import ReadingPreferences from "../ReadingPreferences";
import { splitIntoPages, splitIntoParagraphs, toLines } from "./TextBlockUtils";

type CordelViewerProps = {
  cordel: Cordel;
};

const FONT_SCALE_STORAGE_KEY = "@ECordel:readerFontScale";

const getInitialFontScale = () => {
  const value = Number(window.localStorage.getItem(FONT_SCALE_STORAGE_KEY));
  return Number.isFinite(value) && value > 0 ? value : 1;
};

export const CordelViewer = ({ cordel }: CordelViewerProps) => {
  const pages = useMemo(() => splitIntoPages(cordel.content, 2), [cordel.content]);
  const fullTextParagraphs = useMemo(() => splitIntoParagraphs(cordel.content), [cordel.content]);
  const totalPages = Math.max(1, pages.length);

  const [pageIndex, setPageIndex] = useState(0);
  const [fontScale, setFontScale] = useState(getInitialFontScale);
  const [readingMode, setReadingMode] = useState<"full" | "paginated">("full");

  useEffect(() => {
    if (pageIndex >= totalPages) {
      setPageIndex(Math.max(0, totalPages - 1));
    }
  }, [pageIndex, totalPages]);

  useEffect(() => {
    window.localStorage.setItem(FONT_SCALE_STORAGE_KEY, fontScale.toString());
  }, [fontScale]);

  const downloadFile = async (): Promise<void> => {
    const options = {
      headers: {
        Accept: "text/plain",
      },
    };
    const response = await fetch(`${api.defaults.baseURL!}/cordels/${cordel.id}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Not possible to download the file. Status: ${response.status}`);
    }

    const contentDisposition = response.headers.get("content-disposition");
    let filename = "downloaded_file";

    if (contentDisposition && contentDisposition.includes("filename=")) {
      const matches = contentDisposition.match(/filename="([^"]+)"/);
      if (matches && matches[1]) {
        filename = matches[1];
      }
    }

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  };

  const currentPage = pages[pageIndex] || [""];
  const visibleParagraphs = readingMode === "paginated" ? currentPage : fullTextParagraphs;
  const progress = (100 * (pageIndex + 1)) / totalPages;

  return (
    <Container component="main" maxWidth="xl" sx={{ mt: 3, mb: 6 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "280px minmax(0, 1fr) 250px" },
          gap: 3,
          alignItems: "start",
        }}
      >
        <Stack spacing={2} sx={{ position: { md: "sticky" }, top: { md: 96 } }}>
          <Box
            component="img"
            src={cordel.xilogravura?.url || cordel.xilogravuraUrl || "/cover_not_found.png"}
            alt={cordel.xilogravura?.description || `Capa do cordel: ${cordel.title}`}
            sx={{ width: "100%", borderRadius: 2, maxWidth: 280 }}
          />
          <Typography variant="h3">{cordel.title}</Typography>
          <Typography variant="body2">
            Autor: <Link underline="hover" href={`/autores/${cordel.author.id}`}>{cordel.author.name}</Link>
          </Typography>
          <Typography variant="body2">Ano de publicação: {cordel.year || "Não informado"}</Typography>
          <Typography variant="body2">Fonte: {cordel.source || "Não informado"}</Typography>
          {readingMode === "paginated" ? (
            <>
              <Typography variant="body2">Página {pageIndex + 1} / {totalPages}</Typography>
              <LinearProgress variant="determinate" value={progress} />
            </>
          ) : null}
          <ButtonGroup variant="outlined" aria-label="Formatos disponíveis para download">
            <Button onClick={downloadFile}>Baixar .TXT</Button>
            {cordel.ebookUrl ? <Button href={cordel.ebookUrl}>Baixar .EPUB</Button> : null}
          </ButtonGroup>
        </Stack>

        <Stack spacing={3}>
          <Box
            data-testid="reading-area"
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 2,
              p: { xs: 2, md: 4 },
              minHeight: 360,
            }}
          >
            {visibleParagraphs.map((paragraph, index) => (
              <Typography
                key={`page-line-${index}`}
                variant="body1"
                role="paragraph"
                sx={{ mb: 2, fontSize: `${fontScale}rem` }}
              >
                {toLines(paragraph)}
              </Typography>
            ))}
          </Box>
          {readingMode === "paginated" ? (
            <Stack direction="row" spacing={2}>
              <Button disabled={pageIndex === 0} onClick={() => setPageIndex((value) => value - 1)}>Anterior</Button>
              <Button disabled={pageIndex >= totalPages - 1} onClick={() => setPageIndex((value) => value + 1)}>Próxima</Button>
            </Stack>
          ) : null}
        </Stack>

        <ReadingPreferences
          fontScale={fontScale}
          onDecreaseFont={() => setFontScale((value) => Math.max(0.8, value - 0.1))}
          onIncreaseFont={() => setFontScale((value) => Math.min(1.6, value + 0.1))}
          readingMode={readingMode}
          onToggleReadingMode={() =>
            setReadingMode((mode) => (mode === "full" ? "paginated" : "full"))
          }
        />
      </Box>
    </Container>
  );
};

export const CordelViewerSkeleton = () => (
  <Container component="main" maxWidth="xl" sx={{ mt: 3, mb: 6 }}>
    <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
      <Skeleton variant="rectangular" width={280} height={360} />
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" width="60%" height={48} />
        <Skeleton variant="rectangular" width="100%" height={320} />
      </Stack>
    </Stack>
  </Container>
);