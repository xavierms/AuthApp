import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";

import { environment } from 'src/environments/environment';

import { AuthResponse, User } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private baseUrl :string = environment.baseUrlL;
  private _user!: User;

get user(){
 return {...this._user};
}

  constructor(private http: HttpClient) { }

  saveToken(resp: any){
    localStorage.setItem('token', resp.token! );
      this._user = {
        name: resp.name!,
        uid:  resp.uid!
        }
  }

login(email: string, password: string){

  const url = `${ this.baseUrl }/auth`;
  // const body ={email,password};
return this.http.post<AuthResponse>(url, {email,password})
.pipe(
  tap( resp =>{
    if ( resp.ok ) {
      this.saveToken(resp);
    }
}),
  map( resp => resp.ok ),
  catchError( err => of(err.error.msg))
);
}


validateToken(): Observable<boolean>{

  const url = `${ this.baseUrl }/auth/renew`;
   const headers = new HttpHeaders()
   .set('x-token', localStorage.getItem('token') || '')
 return this.http.get<AuthResponse>( url,{ headers } )
 .pipe(
   map( resp => {
    this.saveToken(resp);
     return resp.ok;
   }),
   catchError(err => of(false))
 )

}

}
