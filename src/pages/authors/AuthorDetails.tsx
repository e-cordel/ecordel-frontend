import { Container } from "@mui/material";
import { useLocation, useParams } from "react-router";
import { StructuralNavigation } from "../../components/StructuralNavigation";
import { useFetch } from "../../hooks/useFetch";
import { Author, CordelSummary } from "../../types";
import { AuthorViewer, AuthorViewerSkeleton } from "../../components/AuthorViewer";

type CordelSummaryPage = {
  content: CordelSummary[];
};

export default function AuthorDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const { data: author } = useFetch<Author, Error>(`authors/${id}`);
  const { data: cordels } = useFetch<CordelSummaryPage, Error>(`cordels/summaries?authorId=${id}`);

  if (!author) return <AuthorViewerSkeleton />;

  return (
    <Container>
      <StructuralNavigation path={location.pathname} title={author.name} />
      <AuthorViewer author={author} cordels={cordels?.content || []} />
    </Container>
  );
}