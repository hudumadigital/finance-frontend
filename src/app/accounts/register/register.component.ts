import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../helpers/must-match.validator";
import {UiService} from "../../services/ui.service";
import {AuthService} from "../../services/auth.service";
import {Customer} from "../../models/customer.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  loadingState = false;

  passwordVisible = false;
  passwordConfirmVisible = false;

  registerForm!: FormGroup;
  isSubmitted = false;

  subscriptions: Subscription[] = []

  constructor(
    private formBuilder: FormBuilder,
    private ui: UiService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'fullName': new FormControl(null, [Validators.required]),
      'mobile': new FormControl(null,
        [Validators.required, Validators.pattern("^[0-9]*$"),
          Validators.minLength(10), Validators.maxLength(10)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'passwordConfirm': new FormControl(null, [Validators.required])
    }, {
      validator: MustMatch('password', 'passwordConfirm')
    });
  }

  get f() {
    return this.registerForm?.controls;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  togglePasswordConfirmVisibility() {
    this.passwordConfirmVisible = !this.passwordConfirmVisible
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.registerForm?.invalid) {
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
      'fullName': this.registerForm.value.fullName,
      'mobile': this.registerForm.value.mobile,
      'email': this.registerForm.value.email,
      'password': this.registerForm.value.password
    }

    this.auth.registerCustomer(customer);

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}
