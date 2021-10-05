import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../helpers/must-match.validator";
import {Customer} from "../../models/customer.model";
import {UiService} from "../../services/ui.service";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loadingState = false;

  passwordVisible = false;

  loginForm!: FormGroup;
  isSubmitted = false;

  subscriptions: Subscription[] = []


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

    this.subscriptions.push(
      this.ui.loadingStateChanged
        .subscribe(
          loadState => {
            this.loadingState = loadState;
          }
        )
    );

    const customer: Customer = {
      'email': this.loginForm.value.email,
      'password': this.loginForm.value.password
    }

    this.auth.loginCustomer(customer);

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}
