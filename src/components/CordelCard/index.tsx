import { Button, Card } from "react-bootstrap";

import styles from './card_cordel.module.scss';

interface CordelCardProps {
  title: string;
  author: string;
  xilogravuraUrl: string;
  click: () => {};
}

export default function CordelCard({ title, author, xilogravuraUrl, click }: CordelCardProps) {
  return (
    <Card onClick={click} style={{ cursor: 'pointer' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {author}
        </Card.Text>
      </Card.Body>
      <Card.Img
        className="rounded-bottom"
        // variant="bottom"
        src={xilogravuraUrl ? xilogravuraUrl : 'http://ler.ecordel.com.br/assets/img/ebook.png'}
        alt={title}
        style={{ width: '100%', height: '24rem', objectFit: 'fill', background: 'gray' }}
      />
    </Card >
  )
}
