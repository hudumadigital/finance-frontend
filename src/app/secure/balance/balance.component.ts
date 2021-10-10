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
  account = '';
  balanceData: any;

  constructor(
    private wallet: WalletService) { }

  ngOnInit(): void {
    this.wallet.getBalance();
    const {email}  = JSON.parse(<string>localStorage.getItem('customer')) ?
      JSON.parse(<string>localStorage.getItem('customer')) : '';
    this.account = email;
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
