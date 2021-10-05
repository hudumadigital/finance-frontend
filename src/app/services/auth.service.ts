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

  registerCustomer(customer: Customer) {
    this.ui.loadingStateChanged.next(true);

    console.log(customer);
  }
}
