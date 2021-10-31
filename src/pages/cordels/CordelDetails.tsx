import { Container } from "@material-ui/core"
import { useParams } from "react-router"
import { useFetch } from "../../hooks/useFetch"

interface Cordel {
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

export default function CordelDetails(){

  const {id} = useParams<{id: string}>()

  const {data: cordel} = useFetch<Cordel,Error>(`cordels/${id}`);
  console.log(cordel)

  if(!cordel) return <p>Loadding...</p>

  return (<Container>

    <p>Clicked on {id}</p>
    <p><strong>Autor: </strong>{cordel.author.name}</p>
    <p><strong>Title: </strong>{cordel.title}</p>
    
    <p><strong>Xilogravura: </strong>{cordel.xilogravuraUrl}</p>
    <p><strong>Texto: </strong>{cordel.content}</p>
    </Container>)
}