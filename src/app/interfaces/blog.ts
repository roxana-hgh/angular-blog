import { Tag } from "./tag";

export interface Blog {
  id: any;
  title: string;
  image: string;
  description: string;
  date: Date;
  tags?: number[];
  check?: boolean;
}
