import { useRouter } from "next/router";
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
  xilogravura: {
    url: string;
    description: string;
    xilografo: string;
  };
  description: string;
  tags: string[];
}

export default function Cordel() {

  const router = useRouter()
  const { id } = router.query
  const { data } = useFetch<Cordel>(`cordels/${id}`);

  return (
    <div>
      <img
        src={data?.xilogravura?.url ? data?.xilogravura?.url : '/fake_cover.png'}
        alt={data?.title}
      />
      <div>
        <h3>{data?.title}</h3>
        <h4>{data?.author.name}</h4>
        <div>
          {data?.content.split('\n').map((line, index) => (<span key={index} > { line} <br /></span>))}
        </div>
      </div>
    </div >

  )
}
