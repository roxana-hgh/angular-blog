import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../interfaces/menu';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  private rootURL = 'http://localhost:3000/Menus';

  constructor(private http: HttpClient) {}

  get_all_Menu() {
    return this.http.get<Menu[]>(this.rootURL);
  }

  get_MenuItem(id: number) {
    return this.http.get<Menu>(this.rootURL + `/${id}`);
  }

  add_Menu(newData: any) {
    return this.http.post(this.rootURL, newData);
  }
  update_Menu(id: number, newData: any) {
    return this.http.put<any>(this.rootURL + `/${id}`, newData);
  }

  delete_Menu(id: number) {
    return this.http.delete<any>(this.rootURL + `/${id}`);
  }
}
