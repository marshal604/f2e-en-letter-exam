import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from '@auth/login/login.component';
import { OtherIdentifyLoginComponent } from '@auth/other-identify-login/other-identify-login.component';
import { AuthComponent } from '@auth/auth.component';

const routes: Route[] = [
  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'other-identify-login', component: OtherIdentifyLoginComponent }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
