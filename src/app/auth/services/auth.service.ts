import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { AuthResponse, User } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrlL;
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  constructor(private http: HttpClient) {}

  // saveToken(resp: any) {
  //   localStorage.setItem('token', resp.token!);
  //   this._user = {
  //     name: resp.name!,
  //     uid: resp.uid!,
  //     email: resp.email!
  //   };
  // }
  // #TODO: PIPE 
register(name: string, email: string, password: string){
  const url = `${this.baseUrl}/auth/new`;
  return this.http.post<AuthResponse>(url, { name, email, password }).pipe(
    // tap((resp) => {
    //   if (resp.ok) {
    //     localStorage.setItem('token', resp.token!);
    //   }
    // }
    tap(({ok, token}) => {
      if (ok) {
        localStorage.setItem('token', token!);
      }
    }
    ),
    map((resp) => resp.ok),
    catchError((err) => of(err.error.msg))
  );
}
  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    // const body ={email,password};
    return this.http.post<AuthResponse>(url, { email, password }).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  validateToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((resp) => {
        localStorage.setItem('token', resp.token!);
        this._user = {
          name: resp.name!,
          uid: resp.uid!,
          email: resp.email!
        };
        return resp.ok;
      }),
      catchError((err) => of(false))
    );
  }

  logout(){
    localStorage.clear();
  }
}
