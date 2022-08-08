import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: UntypedFormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: UntypedFormBuilder,) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      'email': new UntypedFormControl(null, [Validators.required, Validators.email]),
    });
  }

  get f() {
    return this.forgotPasswordForm?.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.forgotPasswordForm?.invalid) {
      return;
    }

    console.log(this.forgotPasswordForm);

  }
}
