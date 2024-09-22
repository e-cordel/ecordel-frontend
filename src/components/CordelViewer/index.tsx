import { Box, Button, Container, Link, Skeleton, Typography as T, useTheme } from "@mui/material";
import { useMemo } from "react";
import { toParagraphs } from "./TextBlockUtils";
import { Cordel } from "../../types";
import { Download } from "@mui/icons-material";

type CordelViewerProps = {
  cordel: Cordel
}

export const CordelViewer = ({ cordel }: CordelViewerProps) => {

  const theme = useTheme();
  const paragraphs = useMemo(() => toParagraphs(cordel.content), [cordel]);

  return (
    <Container component="main"
      sx={{
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
      }}
    >
      <T variant="h3" >{cordel.title}</T>
      <Box
        component="img"
        src={cordel.xilogravuraUrl}
        alt={`Xilogravura do cordel ${cordel.title}`}
        sx={{
          width: '100%',
          maxWidth: '400px',
          height: 'auto',
          borderRadius: '8px',
          marginBottom: '10px'
        }}
      />

      <T variant="body1" component="p">Autor: <Link underline="none" href={`/autores/${cordel.author.id}`}>{cordel.author.name}</Link></T>
      {cordel.year && <T variant="body1" component="p">Ano de publicação: {cordel.year}</T>}
      {cordel.source && <T variant="body1" component="p">Fonte: {cordel.source}</T>}
      {cordel.ebookUrl && <Button href={cordel.ebookUrl} variant="outlined" endIcon={<Download />}>
        Baixar e-cordel
      </Button>}

      {paragraphs}

    </Container>);
}

export const CordelViewerSkeleton = () => (
  <Container component="main" maxWidth="xs">
    <T variant="h3"><Skeleton variant="text" /></T>
    <T variant="subtitle1"><Skeleton variant="text" /></T>
    <Skeleton variant="rectangular" height={550} />
    <p>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </p>
    <p>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </p>

  </Container>

)
