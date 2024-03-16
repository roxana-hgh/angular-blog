import { Tag } from "./tag";

export interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
  date: Date;
  tags?: number[];
  check?: boolean;
}
