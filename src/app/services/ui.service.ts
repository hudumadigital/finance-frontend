import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  loadingStateChanged = new Subject<boolean>();
  serverMessage = 'Internal Server Error, Status Code 500';

  constructor(private snackbar: MatSnackBar) { }

  showSnackbar(message: any = 'THE REQUEST FAILED, TRY AGAIN',
               action = 'OK!', duration = 4000): void {
    this.snackbar.open(message.toUpperCase(), action, {
      duration,
      horizontalPosition: 'center',
      politeness: 'polite',
      verticalPosition: 'bottom'
    })
  }

  errorFormatter(error: any): void {
    const message = error.error.message ? error.error.message : this.serverMessage;
    this.showSnackbar(message);
    this.loadingStateChanged.next(false);
    console.log(error);
  }

}
