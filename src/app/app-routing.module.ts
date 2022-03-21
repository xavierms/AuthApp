import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTokenGuard } from './guards/validate-token.guard';

const routes: Routes = [
  {
    path:'auth',
   loadChildren: () => import('./auth/auth.module').then(auth => auth.AuthModule)
  },
  {
    path:'dashboard',
   loadChildren: () => import('./protected/protected.module').then(auth => auth.ProtectedModule),
   canActivate: [ ValidateTokenGuard ],
   canLoad: [ ValidateTokenGuard ]
  },
  {
    path:'**',
    redirectTo:'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
