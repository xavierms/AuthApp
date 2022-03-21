import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of } from 'rxjs';
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

login(email: string, password: string){

  const url = `${ this.baseUrl }/auth`;
  // const body ={email,password};
return this.http.post<AuthResponse>(url, {email,password})
.pipe(
  tap( resp =>{
    if ( resp.ok ) {
      this._user = {
        name: resp.name!,
        uid:  resp.uid!
        }
    }
}),
  map( resp => resp.ok ),
  catchError( err => of(err.error.msg))
);
}

}
