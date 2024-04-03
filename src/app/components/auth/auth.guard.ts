import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { inject } from '@angular/core'; // For dependency injection

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    
      if (isAuthenticated) {
        return true;
      } else {
        return inject(Router).parseUrl('/login');
      }
   
  }
}
