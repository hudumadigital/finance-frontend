import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import {FlexLayoutModule} from "@angular/flex-layout";

import {AccountsModule} from "./accounts/accounts.module";
import {MaterialModule} from "./material.module";
import {SecureModule} from "./secure/secure.module";

import {TitleService} from "./services/title.service";

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    AccountsModule,
    HttpClientModule,
    SecureModule
  ],
  providers: [
    TitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
