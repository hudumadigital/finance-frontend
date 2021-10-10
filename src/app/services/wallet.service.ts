import { Injectable } from '@angular/core';
import {UiService} from "./ui.service";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PathService} from "./path.service";
import {AuthService} from "./auth.service";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  balanceSubject = new Subject();
  searchedAccountSubject = new Subject();

  constructor(
    private ui: UiService,
    private http: HttpClient,
    private path: PathService,
    private auth: AuthService,
    private route: ActivatedRoute) { }


  depositAmount(amount: number) {
    this.ui.loadingStateChanged.next(false);
    console.log(amount);
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
    console.log(transferData);
  }

  searchAccount() {
    this.ui.loadingStateChanged.next(true);
    let search_query: any = null;
    this.route.queryParams.subscribe(
      query => {
        search_query = query.q;
      }
    );
    this.http.get(`${this.path.bankPath}/search/${search_query}`, this.auth.getOptions())
      .subscribe(
        (result:any) => {
          console.log(`${this.path.bankPath}/search/${search_query}`);
          this.ui.loadingStateChanged.next(false);
          this.searchedAccountSubject.next(result);
        }
      );
  }
}
