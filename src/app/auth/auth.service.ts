import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environmnets.dev';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Allows a user to sign up to the recipe service.
   * @param email the user's email address
   * @param password the user's password (must be 6 characters long)
   * @returns an AuthResponseData object
   */
  signup(email: string, password: string) {
    //attempts to create a new user
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.databaseAPIKey}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorResponse) => {
          return this.handleError(errorResponse);
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

  /**
   * Allows the user to sign in with their email and password.
   * @param email the user's email
   * @param password the user's password
   * @returns an Observable that contains an AuthResponseData object
   */
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.databaseAPIKey}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorResponse) => {
          return this.handleError(errorResponse);
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

  /**
   * Logs out user and navigates back to authentication view.
   */
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  /**
   * Helper method that helps handle user authentication.
   * @param email the user's email
   * @param userId the user's id
   * @param token validation token
   * @param expiresIn amount of time in which token will expire
   */
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 10000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  /**
   * Helper method the generates a descriptive error message based on the given error response.
   * @param errorResponse the error response
   * @returns An error message based on the error.
   */
  private handleError(errorResponse: HttpErrorResponse) {
    //sets up error message to return back to user if an error occurs
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }

    return throwError(errorMessage);
  }
}
