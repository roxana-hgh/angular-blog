import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuthentication());

  constructor() {}

  checkAuthentication(): boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return isAuthenticated;
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(username: string, password: string): Observable<boolean> {
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticatedSubject.next(true);
      localStorage.setItem('isAuthenticated', 'true');
      return this.isAuthenticatedSubject.asObservable();
    } else {
      this.isAuthenticatedSubject.next(false);
      return this.isAuthenticatedSubject.asObservable();
    }
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('isAuthenticated');
  }

  
}
