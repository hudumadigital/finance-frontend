import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RegisterComponent} from "./accounts/register/register.component";
import {LoginComponent} from "./accounts/login/login.component";
import {ForgotPasswordComponent} from "./accounts/forgot-password/forgot-password.component";
import {DashboardComponent} from "./secure/dashboard/dashboard.component";
import {SecureComponent} from "./secure/secure.component";
import {DepositComponent} from "./secure/deposit/deposit.component";
import {BalanceComponent} from "./secure/balance/balance.component";
import {TransferComponent} from "./secure/transfer/transfer.component";
import { HomeComponent } from './home/home.component';
import {BillSummaryComponent} from "./secure/bill-summary/bill-summary.component";
import {ScanQrCodeComponent} from "./secure/scan-qr-code/scan-qr-code.component";
import {QrCodeComponent} from "./secure/qr-code/qr-code.component";
import { BillComponent } from './secure/bill/bill.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {title: 'Home'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'register', component: RegisterComponent, data: {title: 'Register'}},
  {path: 'forgot-password', component: ForgotPasswordComponent, data: {title: 'Forgot Password'}},

  // Secure links
  {path: 'customer', component: SecureComponent,
    children: [
      {path: '', redirectTo: '/customer/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}},
      {path: 'balance', component: BalanceComponent, data: {title: 'Balance'}},
      {path: 'transfers', component: TransferComponent, data: {title: 'Transfers'}},
      {path: 'deposits', component: DepositComponent, data: {title: 'Deposits'}},
      {path: 'utility', component: BillComponent, data: {title: 'Pay Utility'}},
      {path: 'utility-summary', component: BillSummaryComponent, data: {title: 'Utility Summary'}},
      {path: 'scan-qr', component: ScanQrCodeComponent, data: {title: 'Utility Summary'}},
      {path: 'qr-code', component: QrCodeComponent, data: {title: 'Utility Summary'}},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
