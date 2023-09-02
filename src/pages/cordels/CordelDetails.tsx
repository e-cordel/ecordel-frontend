import { Container } from "@mui/material";
import { useParams, useLocation } from "react-router"
import { CordelViewer, CordelViewerSkeleton } from "../../components/CordelViewer";
import { StructuralNavigation } from "../../components/StructuralNavigation";
import { useFetch } from "../../hooks/useFetch"
import { Cordel } from "../../types";

export default function CordelDetails() {

  const { id } = useParams<{ id: string }>()

  const location = useLocation()

  const { data: cordel } = useFetch<Cordel, Error>(`cordels/${id}`);

  if (!cordel) return <CordelViewerSkeleton />
  
  return (<Container>
    <StructuralNavigation path={location.pathname} title={cordel.title} />
    <CordelViewer cordel={cordel} />
  </Container>)
}
