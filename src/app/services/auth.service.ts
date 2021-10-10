import { Injectable } from '@angular/core';

import { PathService } from "./path.service";
import { UiService } from "./ui.service";
import { HttpClient } from "@angular/common/http";

import { Customer } from "../models/customer.model";
import { Router } from "@angular/router";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  customerSubject = new BehaviorSubject({});

  constructor(
    private path: PathService,
    private ui: UiService,
    private http: HttpClient,
    private router: Router) { }

  registerCustomer(customer: Customer) {
    this.ui.loadingStateChanged.next(true);

    // const customerData = new FormData();
    // customerData.append('username', customer.fullName);
    // customerData.append('mobile', customer.mobile);
    // customerData.append('email', customer.email);
    // customerData.append('password', customer.password);
    // console.log(customer);

    this.http.post(this.path.authUrl + '/signup', {
      username: customer.fullName,
      mobile: customer.mobile,
      email: customer.email,
      password: customer.password
    })
      .subscribe(
        (result: any) => {
          this.ui.loadingStateChanged.next(false);
          this.ui.showSnackbar(result.message);
          if(result.success){
            this.router.navigate(['../login']).then(r => {});
          }
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
            this.router.navigate(['customer','dashboard']).then(r => {
              localStorage.setItem('customer', JSON.stringify(result));
            });
            return;
          }

          this.router.navigate(['../login'])
            .then(r => {
              this.ui.showSnackbar(result.message);
            });
        },
        error => {
          this.ui.loadingStateChanged.next(false);
          this.ui.errorFormatter(error);
        }
      );
  }
}
