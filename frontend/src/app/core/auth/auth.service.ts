import {
  computed,
  inject,
  Injectable,
  signal
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Router
} from '@angular/router';

import {
  Observable,
  tap
} from 'rxjs';

import {
  AuthResponse,
  CurrentUser,
  LoginRequest,
  RegisterRequest
} from '../models/auth';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http =
    inject(HttpClient);

  private readonly router =
    inject(Router);


  private readonly apiUrl = environment.apiUrl+"/auth";
   /* 'http://localhost:8080/api/auth';*/


  private readonly TOKEN_KEY =
    'novaimmo_token';

  private readonly USER_KEY =
    'novaimmo_user';


  private readonly currentUserSignal =
    signal<CurrentUser | null>(
      this.loadStoredUser()
    );


  readonly currentUser =
    this.currentUserSignal.asReadonly();


  readonly isAuthenticated =
    computed(() =>
      this.currentUserSignal() !== null
      &&
      !!this.getToken()
    );


  readonly role =
    computed(() =>
      this.currentUserSignal()?.role ?? null
    );


  login(
    request: LoginRequest
  ): Observable<AuthResponse> {

    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/login`,
        request
      )
      .pipe(

        tap(response => {

          this.saveSession(response);

        })

      );
  }


  register(
    request: RegisterRequest
  ): Observable<AuthResponse> {

    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/register`,
        request
      )
      .pipe(

        tap(response => {

          this.saveSession(response);

        })

      );
  }


  logout(): void {

    localStorage.removeItem(
      this.TOKEN_KEY
    );

    localStorage.removeItem(
      this.USER_KEY
    );

    this.currentUserSignal.set(
      null
    );

    this.router.navigate([
      '/'
    ]);
  }


  getToken(): string | null {

    return localStorage.getItem(
      this.TOKEN_KEY
    );
  }


  hasRole(
    ...roles: string[]
  ): boolean {

    const currentRole =
      this.currentUserSignal()
        ?.role;

    if (!currentRole) {
      return false;
    }

    return roles.includes(
      currentRole
    );
  }


  private saveSession(
    response: AuthResponse
  ): void {

    const user: CurrentUser = {

      userId:
      response.userId,

      nom:
      response.nom,

      email:
      response.email,

      role:
      response.role

    };


    localStorage.setItem(
      this.TOKEN_KEY,
      response.token
    );


    localStorage.setItem(
      this.USER_KEY,
      JSON.stringify(user)
    );


    this.currentUserSignal.set(
      user
    );
  }


  private loadStoredUser():
    CurrentUser | null {

    const stored =
      localStorage.getItem(
        this.USER_KEY
      );


    if (!stored) {
      return null;
    }


    try {

      return JSON.parse(
        stored
      ) as CurrentUser;

    } catch {

      localStorage.removeItem(
        this.USER_KEY
      );

      return null;
    }
  }
}
