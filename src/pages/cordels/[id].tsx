import { useRouter } from "next/router";
import { Container, Row } from "react-bootstrap";
import { useFetch } from "../../hooks/useFetch";

interface Cordel {
  id: number;
  author: {
    id: number;
    name: string;
    about: string;
    email: string;
  }
  title: string;
  content: string;
  xilogravura: string;
  description: string;
  tags: string[];
}

export default function Cordel() {

  const router = useRouter()
  const { id } = router.query

  const { data } = useFetch<Cordel>(`cordels/${id}`);

  return (
    <Container>
      <h1>{data?.title}</h1>
      <div>
        {data?.content.split('\n\n').map(block =>
        (<p>
          {block.split('\n').map(line => (<>{line}<br /></>))}
        </p>)
        )}
      </div>
    </Container>
  )
}
