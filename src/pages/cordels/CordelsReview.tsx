import { Container } from "@material-ui/core"
import { useLocation } from "react-router"
import { CordelList } from "../../components/CordelList"
import { StructuralNavigation } from "../../components/StructuralNavigation"



export default function CordelsReview() {

  const location = useLocation()


  return (
    <Container>
      <StructuralNavigation path={location.pathname} title="review" />
      <CordelList />
    </Container >
  )
}