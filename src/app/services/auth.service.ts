import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../components/auth/user.model';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private isAuthenticatedSubject = new BehaviorSubject<boolean>(
  //   this.checkAuthentication()
  // );
  private SignUprootURL =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFc86U9iTigdGRvJyvbGymSjzDf-_4SHc';
  private SignInrootURL =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFc86U9iTigdGRvJyvbGymSjzDf-_4SHc';

  user = new Subject<User>();
  constructor(private http: HttpClient) {}

  // checkAuthentication(): boolean {
  //   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  //   return isAuthenticated;
  // }

  // isAuthenticated(): Observable<boolean> {
  //   return this.isAuthenticatedSubject.asObservable();
  // }

  // login(username: string, password: string): Observable<boolean> {
  //   if (username === 'admin' && password === 'admin') {
  //     this.isAuthenticatedSubject.next(true);
  //     localStorage.setItem('isAuthenticated', 'true');
  //     return this.isAuthenticatedSubject.asObservable();
  //   } else {
  //     this.isAuthenticatedSubject.next(false);
  //     return this.isAuthenticatedSubject.asObservable();
  //   }
  // }

  // logout(): void {
  //   this.isAuthenticatedSubject.next(false);
  //   localStorage.removeItem('isAuthenticated');
  // }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.SignUprootURL, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'An unknown Error accurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage =
                'The email address is already in use by another account.';
              break;
            case 'OPERATION_NOT_ALLOWED':
              errorMessage = 'Password sign-in is disabled for this project.';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              errorMessage =
                'We have blocked all requests from this device due to unusual activity. Try again later.';
              break;
            default:
              errorMessage = 'An unknown Error accurred!';
          }
          return throwError(errorMessage);
        }),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.SignInrootURL, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'An unknown Error accurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              errorMessage =
                'There is no user record corresponding to this identifier.';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'The password is invalid';
              break;
            case 'INVALID_LOGIN_CREDENTIALS':
              errorMessage = 'Invalid login credentials';
              break;
            case 'USER_DISABLED':
              errorMessage =
                'The user account has been disabled by an administrator.';
              break;
            default:
              errorMessage = 'An unknown Error accurred!';
          }
          return throwError(errorMessage);
        }),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }
}
