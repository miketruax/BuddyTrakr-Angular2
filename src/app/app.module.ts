import { BrowserModule } from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {reducers} from './reducers'
import { AppComponent } from './app.component';
import {StoreModule} from "@ngrx/store";
import {routes} from "./app.routes";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";

import {AboutComponent} from "./about/about.component";
import {AuthProtected} from "./services/auth-protected.service";
import {UserService} from './services/user.service'
import {FlashComponent} from "./flash/flash.component";
import {SignupComponent} from "./signup/signup.component";
import {AuthGeneric} from "./services/auth-generic.service";
import {SettingsComponent} from "./settings/settings.component";
import {InitUserService} from "./services/init-user.service";
import {HttpClientModule} from "@angular/common/http";
import { BuddiesModule } from './buddies/buddies.module';

export function startupUser(startupService: InitUserService){
  console.log("startup");
  return ()=> startupService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    FlashComponent,
    LoginComponent, AboutComponent,
     SignupComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    StoreModule.forRoot(reducers), 
    BuddiesModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: startupUser, deps: [InitUserService], multi: true },
    InitUserService,
  UserService, AuthProtected, AuthGeneric],
  bootstrap: [AppComponent]
})

export class AppModule { }
