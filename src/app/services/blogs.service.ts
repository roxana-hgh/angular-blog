import { Injectable, inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../interfaces/blog';
import { Observable } from 'rxjs';

import { Firestore, collection, collectionData} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  private rootURL = 'http://localhost:3000/Blogs';

  private firestore: Firestore = inject(Firestore); // inject Cloud Firestore


  constructor(private http: HttpClient) {}

  get_all_blogs() {
    return this.http.get<Blog[]>(this.rootURL);
  }

  // get_all_blogs(): Observable<any> {
  //   const BlogsCollection = collection(this.firestore, 'Blogs');

  //   // get documents (data) from the collection using collectionData
  //   return collectionData(BlogsCollection) as Observable<Blog[]>;
   
  // }


  get_blog(id: number) {
    return this.http.get<Blog>(this.rootURL + `/${id}`);
  }

  add_blog(newData: any) {
    return this.http.post(this.rootURL, newData);
  }
  update_Blog(id: number, newData: any) {
    return this.http.put<any>(this.rootURL + `/${id}`, newData);
  }

  delete_Blog(id: number) {
    return this.http.delete<any>(this.rootURL + `/${id}`);
  }
}
