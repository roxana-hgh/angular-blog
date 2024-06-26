import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { inject } from '@angular/core'; // For dependency injection

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false
      }
   
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false
      }
   
  }
}