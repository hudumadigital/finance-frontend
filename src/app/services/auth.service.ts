import { Injectable } from '@angular/core';

import {PathService} from "./path.service";
import {UiService} from "./ui.service";
import {HttpClient} from "@angular/common/http";

import {Customer} from "../models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private path: PathService,
    private ui: UiService,
    private http: HttpClient) { }

  registerCustomer(customer: any) {
    this.ui.loadingStateChanged.next(true);

    const customerData = new FormData();
    customerData.append('username', customer.fullName);
    customerData.append('mobile', customer.mobile);
    customerData.append('email', customer.email);
    customerData.append('password', customer.password);

    this.http.post(this.path.url + '/signup', customerData, {})
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
}
