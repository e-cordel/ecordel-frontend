export interface Cordel {
  id: string;
  author: Author;
  title: string;
  description: string;
  content: string;
  published: boolean;
  tags: string[];
  featured?: boolean;
  // deprecated
  xilogravuraUrl?: string;
  xilogravura: Xilogravura;
  year: number;
  ebookUrl: string;
  source: string;
}

export interface CordelSummary {
  id: number;
  title: string;
  xilogravuraUrl: string;
  xilogravuraDescription?: string;
  authorName: string;
  authorId: number;
  ebookUrl: string;
  tags?: string[];
  featured?: boolean;
  year?: number;
  description?: string;
}

export interface Author {
  id: number;
  name?: string;
  about?: string;
  email?: string;
}

export interface Xilogravura {
  id?: number | null;
  url: string;
  title?: string;
  description?: string;
}