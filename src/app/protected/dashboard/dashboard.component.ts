import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
        *{
            margin: 15px;
        }
  `
  ]
})
export class DashboardComponent  {

  constructor(private router: Router,
              private authService: AuthService) { }

 get user(){
     return this.authService.user;
 }


  
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth');

  }
}
