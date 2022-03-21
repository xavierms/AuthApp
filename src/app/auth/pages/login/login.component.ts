import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import  Swal  from "sweetalert2";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private AuthService: AuthService) { }



formLogin: FormGroup = this.formBuilder.group({
 email:    ['x1@test.com',[Validators.required, Validators.email]],
 password: ['123456',[Validators.required, Validators.minLength(6)]]
});


login(){
  console.log(this.formLogin.value);
 const { email, password } = this.formLogin.value;
this.AuthService.login(email,password)
                .subscribe( authenticated =>{
                  console.log(authenticated);
                  
                  if ( authenticated === true ) {
                     this.router.navigateByUrl('/dashboard') ;
                  }
                  else{
                    Swal.fire('Error', authenticated, 'error');
                  }
                  
                })
}

}
