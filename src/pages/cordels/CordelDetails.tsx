// import { useEffect } from "react";
import { Container } from "@mui/material";
import { useParams, useLocation } from "react-router"
import { CordelDetailsInterface, CordelViewer, CordelViewerSkeleton } from "../../components/CordelViewer";
import { StructuralNavigation } from "../../components/StructuralNavigation";
import { useFetch } from "../../hooks/useFetch"

export default function CordelDetails() {

  const { id } = useParams<{ id: string }>()

  const location = useLocation()

  const { data: cordel } = useFetch<CordelDetailsInterface, Error>(`cordels/${id}`);

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth"
  //   });
  // }, []);

  if (!cordel) return <CordelViewerSkeleton />
  
  return (<Container>
    <StructuralNavigation path={location.pathname} title={cordel.title} />
    <CordelViewer cordel={cordel} />
  </Container>)
}
