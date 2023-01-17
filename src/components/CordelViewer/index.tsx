import { Card, Container, Skeleton, Typography as T, useTheme } from "@mui/material";
import { useMemo } from "react";
import { getSourceLink, toParagraphs } from "./TextBlockUtils";


export interface CordelDetailsInterface {
  id: string;
  author: {
    id: number;
    name: string;
    about: string;
    email: string;
  }
  title: string;
  description: string;
  content: string;
  published: boolean;
  tags: Array<string>;
  xilogravuraUrl: string;
}

type CordelViewerProps = {
  cordel: CordelDetailsInterface
}



export const CordelViewer = ({ cordel }: CordelViewerProps) => {

  const theme = useTheme();
  const paragraphs = useMemo(() => toParagraphs(cordel.content), [cordel])
  const sourceLink = useMemo(() => getSourceLink(cordel.content), [cordel])

  return (
    <Container component="main" maxWidth="xs" sx={{
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    }}>
      <T variant="h3" >{cordel.title} </T>
      <T variant="subtitle1">{cordel.author.name}</T>
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
