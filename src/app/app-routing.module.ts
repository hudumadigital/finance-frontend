import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RegisterComponent} from "./accounts/register/register.component";
import {LoginComponent} from "./accounts/login/login.component";
import {ForgotPasswordComponent} from "./accounts/forgot-password/forgot-password.component";
import {DashboardComponent} from "./secure/dashboard/dashboard.component";
import {SecureComponent} from "./secure/secure.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'register', component: RegisterComponent, data: {title: 'Register'}},
  {path: 'forgot-password', component: ForgotPasswordComponent, data: {title: 'Forgot Password'}},

  // Secure links
  {path: 'customer', component: SecureComponent,
    children: [
      {path: '', redirectTo: '/customer/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}},
      {path: 'balance', component: DashboardComponent, data: {title: 'Balance'}},
      {path: 'transfers', component: DashboardComponent, data: {title: 'Transfers'}},
      {path: 'deposits', component: DashboardComponent, data: {title: 'Deposits'}},
      {path: 'balance', component: DashboardComponent, data: {title: 'Balance'}},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
