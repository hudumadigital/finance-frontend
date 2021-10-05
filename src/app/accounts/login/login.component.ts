import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../helpers/must-match.validator";
import {Customer} from "../../models/customer.model";
import {UiService} from "../../services/ui.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loadingState = false;

  passwordVisible = false;

  loginForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private ui: UiService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
    });
  }

  get f() {
    return this.loginForm?.controls;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginForm?.invalid) {
      return;
    }

    this.ui.loadingStateChanged
      .subscribe(
        loadState => {
          this.loadingState = loadState;
        }
      );

    const customer: Customer = {
      'email': this.loginForm.value.email,
      'password': this.loginForm.value.password
    }

    this.auth.loginCustomer(customer);

  }

}
