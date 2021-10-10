import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RegisterComponent} from "./accounts/register/register.component";
import {LoginComponent} from "./accounts/login/login.component";
import {ForgotPasswordComponent} from "./accounts/forgot-password/forgot-password.component";
import {DashboardComponent} from "./secure/dashboard/dashboard.component";
import {SecureComponent} from "./secure/secure.component";
import {DepositComponent} from "./secure/deposit/deposit.component";
import {BalanceComponent} from "./secure/balance/balance.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'register', component: RegisterComponent, data: {title: 'Register'}},
  {path: 'forgot-password', component: ForgotPasswordComponent, data: {title: 'Forgot Password'}},

  // Secure links
  {path: 'customer', component: SecureComponent,
    children: [
      {path: '', redirectTo: '/customer/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}},
      {path: 'balance', component: BalanceComponent, data: {title: 'Balance'}},
      {path: 'transfers', component: DashboardComponent, data: {title: 'Transfers'}},
      {path: 'deposits', component: DepositComponent, data: {title: 'Deposits'}},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
