import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent  {

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }



  formRegister: FormGroup = this.formBuilder.group({
    name:    ['Test 4',[Validators.required]],
    email:    ['test4@test.com',[Validators.required, Validators.email]],
    password: ['123456',[Validators.required, Validators.minLength(6)]]
   });

   
register(){
  console.log(this.formRegister.value);

  this.router.navigateByUrl('/dashboard');
}
}
