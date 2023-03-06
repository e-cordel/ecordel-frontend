import { Container } from "@mui/material"
import { useLocation } from "react-router"
import { CordelList } from "../../../components/CordelList"
import { StructuralNavigation } from "../../../components/StructuralNavigation"

export default function CordelsReviewList() {

  const location = useLocation();

  return (
    <Container>
      <StructuralNavigation path={location.pathname} title="review" />
      <CordelList />
    </Container >
  )
}