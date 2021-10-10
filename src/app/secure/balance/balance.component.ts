import {Component, OnDestroy, OnInit} from '@angular/core';
import {WalletService} from "../../services/wallet.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit, OnDestroy {

  loadingState = false;
  subscriptions: Subscription[] = [];
  balanceData = {
    primaryBalance: 12000,
    agencyBalance: 15000,
    totalBalance: 27000,
    account: 'saidmunir73@gmail.com'
  }

  constructor(
    private wallet: WalletService) { }

  ngOnInit(): void {
    this.wallet.getBalance();
    this.subscriptions.push(
      this.wallet.balanceSubject
        .subscribe(
          (result: any) => {
            this.balanceData = result;
          }
        )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
