import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing} from './app.routing';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {LoginService} from "./login/login.service";
import {HomeComponent} from './home/home.component';
import {LoginGuardService} from "./services/login-guard.service";
import {ChatService} from "./services/chat.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    LoginService,
    LoginGuardService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
