import { Blog } from "./blog";

export interface Colloction {
    id: number;
    title: string;
    description: string;
    image: string;
    blogs: Blog[];
}