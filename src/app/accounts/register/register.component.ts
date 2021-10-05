import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../helpers/must-match.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordVisible = false;
  passwordConfirmVisible = false;

  registerForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'fullName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.min(8)]),
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

    console.log(this.registerForm);

  }


}
