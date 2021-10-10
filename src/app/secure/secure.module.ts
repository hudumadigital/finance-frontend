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
import { TransferComponent } from './transfer/transfer.component';
import { BillSummaryComponent } from './bill-summary/bill-summary.component';
import { BillComponent } from './bill/bill.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { ScanQrCodeComponent } from './scan-qr-code/scan-qr-code.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SecureComponent,
    SecureSidebarComponent,
    SecureTopbarComponent,
    DashboardCardComponent,
    DepositComponent,
    BalanceComponent,
    TransferComponent,
    BillSummaryComponent,
    BillComponent,
    QrCodeComponent,
    ScanQrCodeComponent
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
