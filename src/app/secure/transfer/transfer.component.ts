import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UiService} from "../../services/ui.service";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {WalletService} from "../../services/wallet.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  searchedAccount?: string;
  isAccountSearched = false;
  isFormSubmitted = true;
  subscriptions: Subscription[] = [];
  loadingState = false;
  transferForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private ui: UiService,
    private wallet: WalletService) {
  }

  ngOnInit(): void {
  }

  search(searchForm: NgForm): void
  {
    const searchQuery = searchForm.value.search_query;
    searchQuery.trim();
    this.onSetQuery(searchQuery);
  }
  onSetQuery(query: string): void{
    this.router.navigate(['/customer/transfers'], {queryParams:  {q: query}})
      .then(result => {
        if (result){
          this.wallet.searchAccount();
          this.wallet.searchedAccountSubject
            .subscribe(
              (result: any) => {
                console.log(result);
                this.isAccountSearched = true; // true when account is obtained
                this.searchedAccount = query;
                this.transferForm = new FormGroup({
                  account: new FormControl(this.searchedAccount, [Validators.required]),
                  amount: new FormControl(null, [Validators.required]),
                });
              }
            )
        }
        this.wallet.searchAccount();
      })
      .catch(error => this.ui.showSnackbar('SEARCH COULD NOT BE PROCESSED'));
  }


  get f() {
    return this.transferForm?.controls;
  }

  onSubmitForm() {
    this.isFormSubmitted = true;

    if (this.transferForm.invalid) {
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

    const transferData: any = {
      primaryAmount: this.transferForm.value.amount
    }

    this.wallet.transferAmount(transferData);

  }


  ngOnDestroy(): void {
  }


  removeFocus(event: any): void {
    event.target.blur();
  }

}
