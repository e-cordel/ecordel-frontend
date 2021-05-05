import { Button, Col, Container, FormControl, InputGroup, Jumbotron, Row } from "react-bootstrap";
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/router'

import CordelCard from "../components/CordelCard";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";

interface Cordel {
  id: number;
  title: string;
  xilogravuraUrl: string;
  authorName: string;
}

interface CordelRequest {
  content: Cordel[];
}

export default function Home() {

  const [searchTitle, setSearchTitle] = useState('');

  const router = useRouter();

  const { data } = useFetch<CordelRequest>(`cordels?title=${searchTitle}`);

  return (
    <>
      <Jumbotron>
        <Container>
          <h1>Bem vindo ao e-cordel!</h1>
          <p>
            Para mais informações, visite nossa pagina.
        </p>
          <p>
            <Button variant="primary" onClick={e => router.push('https://ecordel.com.br/')} >Projeto e-cordel</Button>
          </p>
        </Container>
      </Jumbotron>

      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Buscar cordel"
            aria-label="buscar cordel"
            aria-describedby="search"
            value={searchTitle}
            onChange={e => setSearchTitle(e.target.value)}
          />
          <InputGroup.Append>
            <Button variant="outline-primary">
              <FiSearch />
            </Button>
          </InputGroup.Append>
        </InputGroup>

        <Row xs={1} md={2} lg={3}>
          {data?.content.map(({ id, title, authorName, xilogravuraUrl }: Cordel) => (
            <Col className="p-2 d-flex align-items-stretch" key={id} >
              <CordelCard
                click={() => router.push(`cordels/${id}`)}
                title={title}
                author={authorName}
                xilogravuraUrl={xilogravuraUrl}
              />
            </Col>
          ))}
        </Row>

      </Container>
    </>
  )
}
