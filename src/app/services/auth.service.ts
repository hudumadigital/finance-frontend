import { Injectable } from '@angular/core';

import { PathService } from "./path.service";
import { UiService } from "./ui.service";
import { HttpClient } from "@angular/common/http";

import { Customer } from "../models/customer.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private path: PathService,
    private ui: UiService,
    private http: HttpClient,
    private router: Router) { }

  registerCustomer(customer: any) {
    this.ui.loadingStateChanged.next(true);

    const customerData = new FormData();
    customerData.append('username', customer.fullName);
    customerData.append('mobile', customer.mobile);
    customerData.append('email', customer.email);
    customerData.append('password', customer.password);

    this.http.post(this.path.authUrl + '/signup', customerData, {})
      .subscribe(
        (result: any) => {
          this.ui.loadingStateChanged.next(false);
          this.ui.showSnackbar(result.message);
        },
        error => {
          this.ui.loadingStateChanged.next(false);
          this.ui.errorFormatter(error);
        }
      );
  }

  loginCustomer(customer: any) {
    this.ui.loadingStateChanged.next(true);

    // const customerData = new FormData();
    // customerData.append('email', customer.email);
    // customerData.append('password', customer.password);
    // console.log(customer);
    this.http.post(this.path.authUrl + '/login', {
      email: customer.email,
      password: customer.password
    })
      .subscribe(
        (result: any) => {
          this.ui.loadingStateChanged.next(false);

          if (result.isLoggedIn) {
            this.router.navigate(['dashboard']).then(r => {
            });
            return;
          }
          this.ui.showSnackbar(result.message);
          this.router.navigate(['../login']);
        },
        error => {
          this.ui.loadingStateChanged.next(false);
          this.ui.errorFormatter(error);
        }
      );
  }
}
