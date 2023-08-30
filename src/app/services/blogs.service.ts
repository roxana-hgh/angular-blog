import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../interfaces/blog';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private rootURL = 'http://localhost:3000/Blogs';

  constructor(private http: HttpClient) {}

  get_all_blogs() {
    return this.http.get<Blog[]>(this.rootURL);
  }

  get_blog(id: number) {
    return this.http.get<Blog>(this.rootURL + `/${id}`);
  }
}
