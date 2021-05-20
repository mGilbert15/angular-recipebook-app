import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environmnets.dev';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

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
          //sets up error message to return back to user if an error occurs
          let errorMessage = 'An unknown error occurred!';
          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
          }
          switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already';
          }

          return throwError(errorMessage);
        })
      );
  }

  signin() {}
}
