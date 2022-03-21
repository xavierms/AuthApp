import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'auth',
   loadChildren: () => import('./auth/auth.module').then(auth => auth.AuthModule)
  },
  {
    path:'dashboard',
   loadChildren: () => import('./protected/protected.module').then(auth => auth.ProtectedModule)
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
