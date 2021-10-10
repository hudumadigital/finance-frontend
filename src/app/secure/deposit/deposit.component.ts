import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UiService} from "../../services/ui.service";
import {WalletService} from "../../services/wallet.service";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit, OnDestroy {

  accounts: Array<string> = ['Primary account', 'Agency account'];
  isAccountSelected = false;
  isFormSubmitted = false;
  loadingState = false;
  subscriptions: Subscription[] = []


  depositForm: FormGroup = new FormGroup({
    account: new FormControl(''),
    amount: new FormControl('')
  });

  constructor(
    private ui: UiService,
    private wallet: WalletService) { }

  ngOnInit(): void {
    this.depositForm = new FormGroup({
      account: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
    });
  }

  get f() {
    return this.depositForm?.controls;
  }

  getAmountInputField() {
    this.isAccountSelected = true;
  }

  onSubmitForm() {
    this.isFormSubmitted = true;

    if (this.depositForm.invalid) {
      return;
    }

    this.subscriptions.push(
      this.ui.loadingStateChanged
        .subscribe(
          loadState => {
            this.loadingState = loadState;
          }
        )
    );

    if (this.depositForm.value.account === 'Agency account' ) {
      const depositData: any = {
        agencyAmount: this.depositForm.value.amount
      }
      return;
    }

    const depositData: any = {
      primaryAmount: this.depositForm.value.amount
    }

    this.wallet.depositAmount(depositData);

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}
