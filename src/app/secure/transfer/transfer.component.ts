import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
    private wallet: WalletService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let search_query: any;
    this.route.queryParams.subscribe(
      query => {
        search_query = query.q;
        if (search_query) {
          this.searchedResult();
        }
      }
    );
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
          this.searchedResult()
        }
      })
      .catch(error => this.ui.showSnackbar('SEARCH COULD NOT BE PROCESSED'));
  }

  searchedResult() {
    this.wallet.searchAccount();
    this.wallet.searchedAccountSubject
      .subscribe(
        (result: any) => {
            console.log(result);
            if (result.error) {
              this.isAccountSearched = false;
              this.searchedAccount = '';
              return;
            }
            this.isAccountSearched = true;
            this.searchedAccount = result.email;
            this.ui.showSnackbar(result.message);
            this.transferForm = new FormGroup({
              account: new FormControl(this.searchedAccount, [Validators.required]),
              amount: new FormControl(null, [Validators.required]),
            });
        },
        error => {
          this.ui.errorFormatter(error);
        }
      )
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
      amount: this.transferForm.value.amount,
      accountMail: this.transferForm.value.account
    }

    this.wallet.transferAmount(transferData);

  }


  ngOnDestroy(): void {
  }


  removeFocus(event: any): void {
    event.target.blur();
  }

}
