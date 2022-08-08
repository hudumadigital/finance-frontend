import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
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

  registerForm!: UntypedFormGroup;
  isSubmitted = false;

  subscriptions: Subscription[] = []

  constructor(
    private formBuilder: UntypedFormBuilder,
    private ui: UiService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'fullName': new UntypedFormControl(null, [Validators.required]),
      'mobile': new UntypedFormControl(null,
        [Validators.required, Validators.pattern("^[0-9]*$"),
          Validators.minLength(10), Validators.maxLength(10)]),
      'email': new UntypedFormControl(null, [Validators.required, Validators.email]),
      'password': new UntypedFormControl(null, [Validators.required, Validators.minLength(8)]),
      'passwordConfirm': new UntypedFormControl(null, [Validators.required])
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
