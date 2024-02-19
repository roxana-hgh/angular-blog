import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../interfaces/tag';
@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private rootURL = 'http://localhost:3000/Tags';
  constructor(private http: HttpClient) { }
  get_all_Tags() {
    return this.http.get<Tag[]>(this.rootURL);
  }

  get_Tag(id: number) {
    return this.http.get<Tag>(this.rootURL + `/${id}`);
  }

  add_Tag(newData: any) {
    return this.http.post(this.rootURL, newData);
  }

  
}
