import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent  {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private AuthService: AuthService) { }



  formRegister: FormGroup = this.formBuilder.group({
    name:    ['Test 4',[Validators.required]],
    email:    ['test4@test.com',[Validators.required, Validators.email]],
    password: ['123456',[Validators.required, Validators.minLength(6)]]
   });

   
register(){
  const { name, email, password } = this.formRegister.value;
 this.AuthService.register( name, email, password )
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
