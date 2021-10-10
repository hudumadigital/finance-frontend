import { Injectable } from '@angular/core';
import { UiService } from "./ui.service";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { PathService } from "./path.service";
import { AuthService } from "./auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  balanceSubject = new Subject();
  searchedAccountSubject = new Subject();
  billSummarySubject = new Subject();

  constructor(
    private ui: UiService,
    private http: HttpClient,
    private path: PathService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }


  depositAmount(amount: number) {
    this.ui.loadingStateChanged.next(true);
    // console.log(amount);
    this.http.post(`${this.path.bankPath}/add-balance`, { amount }, this.auth.getOptions())
      .subscribe(
        (result: any) => {
          this.ui.loadingStateChanged.next(false);
          // console.log(result)
          this.ui.showSnackbar(result.message);
          this.router.navigate(['customer', 'balance']).then(r => {});
        }, error => {
          this.ui.loadingStateChanged.next(false);
          this.ui.errorFormatter(error);
        }
      )
  }

  getBalance() {
    this.ui.loadingStateChanged.next(true);
    this.http.get(`${this.path.bankPath}/balance`, this.auth.getOptions())
      .subscribe(
        (result: any) => {
          this.ui.loadingStateChanged.next(false);
          this.balanceSubject.next(result);
          if (result.message) {
            this.ui.showSnackbar(result.message);
          }
        },
        error => {
          this.ui.loadingStateChanged.next(false);
          this.ui.errorFormatter(error);
        }
      );
  }

  transferAmount(transferData: any) {
    this.ui.loadingStateChanged.next(true);
    this.http.post(`${this.path.bankPath}/send-to-wallet`, {
      amount: transferData.amount,
      accountMail: transferData.accountMail
    }, this.auth.getOptions())
      .subscribe(
        (result: any) => {
          this.ui.loadingStateChanged.next(false);
          this.ui.showSnackbar(result.message);
          this.router.navigate(['customer', 'balance']).then(r => { })
        },
        error => {
          this.ui.errorFormatter(error);
        }
      );
  }

  searchAccount() {
    this.ui.loadingStateChanged.next(true);
    let search_query = '';
    this.route.queryParams.subscribe(
      query => {
        search_query = query.q;
      }
    );
    this.http.get(`${this.path.bankPath}/search/${search_query}`, this.auth.getOptions())
      .subscribe(
        (result: any) => {
          this.ui.loadingStateChanged.next(false);
          this.searchedAccountSubject.next(result);
        },
        error => {
          this.ui.loadingStateChanged.next(false);
          this.ui.errorFormatter(error)
        }
      );
  }

  payBill(billData: any) {
    this.ui.loadingStateChanged.next(true);
    this.http.post(`${this.path.bankPath}/bill-summary`, {

    },this.auth.getOptions())
      .subscribe(
        (result: any) => {
          this.ui.loadingStateChanged.next(false);
          console.log(result);
        },
        error => {
          this.ui.loadingStateChanged.next(false);
          this.ui.errorFormatter(error)
        }
      );
  }

  getBillSummary() {
    this.ui.loadingStateChanged.next(true);
    this.http.get(`${this.path.bankPath}/bill-summary`, this.auth.getOptions())
      .subscribe(
        (result: any) => {
          this.ui.loadingStateChanged.next(false);
          this.billSummarySubject.next(result);
        },
        error => {
          this.ui.loadingStateChanged.next(false);
          this.ui.errorFormatter(error);
        }
      );
  }
}
