export interface Category {
  id: number;
  title: string;
  image: string;
  description: string;
  date: Date;
  author?: User;
}
