import { Injectable } from '@angular/core';
import {UiService} from "./ui.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  balanceSubject = new Subject();

  constructor(
    private ui: UiService) { }


  depositAmount(amount: number) {
    this.ui.loadingStateChanged.next(false);
    console.log(amount);
  }

  getBalance() {
    this.ui.loadingStateChanged.next();

  }
}
