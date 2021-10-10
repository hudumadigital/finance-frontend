import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SecureComponent } from './secure.component';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../material.module";
import {FlexModule} from "@angular/flex-layout";
import { SecureSidebarComponent } from './secure-sidebar/secure-sidebar.component';
import { SecureTopbarComponent } from './secure-topbar/secure-topbar.component';
import { DashboardCardComponent } from './dashboard/dashboard-card/dashboard-card.component';
import { DepositComponent } from './deposit/deposit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BalanceComponent } from './balance/balance.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SecureComponent,
    SecureSidebarComponent,
    SecureTopbarComponent,
    DashboardCardComponent,
    DepositComponent,
    BalanceComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        FlexModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class SecureModule { }
