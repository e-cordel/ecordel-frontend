import { Box, Button, ButtonGroup, Container, Link, Skeleton, Typography as T, useTheme } from "@mui/material";
import { useMemo } from "react";
import { toParagraphs } from "./TextBlockUtils";
import { Cordel } from "../../types";
import api from "../../services/api";

type CordelViewerProps = {
  cordel: Cordel
}

export const CordelViewer = ({ cordel }: CordelViewerProps) => {

  const theme = useTheme();
  const paragraphs = useMemo(() => toParagraphs(cordel.content), [cordel]);

  const downloadFile = async (): Promise<void> => {
    try {
      const options = {
        headers: {
          "Accept": "text/plain",
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

      // Convert response to Blob
      const blob = await response.blob();

      // Create a link to trigger the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;

      // Append link to the document, trigger the download, and clean up
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

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

      <T variant="h4" component="p">Dados da obra</T>
      <T variant="body1" component="p">Autor: <Link underline="none" href={`/autores/${cordel.author.id}`}>{cordel.author.name}</Link></T>
      <T variant="body1" component="p">Ano de publicação: {cordel.year ? cordel.year : "Não informado"}</T>
      <T variant="body1" component="p">Fonte: {cordel.source ? cordel.source: "Não informado"}</T>
      
      <T variant="h4" component="p">Formatos disponíveis para download</T>
      <ButtonGroup variant="outlined" aria-label="Formatos disponíveis para download">
        <Button onClick={() =>
          downloadFile()
        }>Baixar .TXT</Button>  
        {cordel.ebookUrl && <Button href={cordel.ebookUrl}>
          Baixar .EPUB
        </Button>}
      </ButtonGroup>
      
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
