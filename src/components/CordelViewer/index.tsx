import { Card, Container, Link, Skeleton, Typography as T, useTheme } from "@mui/material";
import { useMemo } from "react";
import { getSourceLink, toParagraphs } from "./TextBlockUtils";
import { Cordel } from "../../types";

type CordelViewerProps = {
  cordel: Cordel
}

export const CordelViewer = ({ cordel }: CordelViewerProps) => {

  const theme = useTheme();
  const paragraphs = useMemo(() => toParagraphs(cordel.content), [cordel]);
  const sourceLink = useMemo(() => getSourceLink(cordel.content), [cordel]);

  return (
    <Container component="main" maxWidth="xs" sx={{
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    }}>
      <T variant="h3" >{cordel.title} </T>
      <Link variant="subtitle1" underline="none" href={`/autores/${cordel.author.id}`}>{cordel.author.name}</Link>
      <Card sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(3)
      }}>
        <img
          src={cordel.xilogravuraUrl}
          alt={cordel.title}
          style={{
            flex: 1,
          }} />
      </Card>

      {paragraphs}
      {sourceLink}
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
