export interface Cordel {
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
  year: number;
  ebookUrl: string;
  source: string;
}

export interface CordelSummary {
  id: number;
  title: string;
  xilogravuraUrl: string;
  authorName: string;
  authorId: number;
  ebookUrl: string;
}

export interface Author {
  id: number;
  name: string;
  about: string;
  email: string;
}
