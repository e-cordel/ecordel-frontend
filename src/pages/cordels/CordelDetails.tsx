import { Container } from "@material-ui/core";
import { useParams } from "react-router"
import { CordelDetailsInterface, CordelViewer, CordelViewerSkeleton } from "../../components/CordelViewer";
import { useFetch } from "../../hooks/useFetch"

export default function CordelDetails() {

  const { id } = useParams<{ id: string }>()

  const { data: cordel } = useFetch<CordelDetailsInterface, Error>(`cordels/${id}`);
  // const cordel = null;
  console.log(cordel)

  if (!cordel) return <CordelViewerSkeleton />

  return (<Container>
    <CordelViewer cordel={cordel} />
  </Container>)
}
