import { Component, OnDestroy, OnInit } from '@angular/core';
import { WalletService } from "../../services/wallet.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-bill-summary',
  templateUrl: './bill-summary.component.html',
  styleUrls: ['./bill-summary.component.css']
})
export class BillSummaryComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  utilities: any[] = [];

  constructor(
    private wallet: WalletService,) { }

  ngOnInit(): void {
    this.wallet.getBillSummary();
    this.subscriptions.push(
      this.wallet.billSummarySubject
        .subscribe(
          (result: any) => {
            result.forEach((elem: any) => {
              this.utilities.push(elem.utility);
            });
            console.log(this.utilities);
            
          }
        )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
