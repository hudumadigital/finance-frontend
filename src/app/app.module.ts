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
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FlexLayoutModule,
        AccountsModule,
        HttpClientModule,
        SecureModule,
        MatButtonModule
    ],
  providers: [
    TitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
