import { BrowserModule } from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {reducers} from './store/reducers'
import { AppComponent } from './app.component';
import {StoreModule} from "@ngrx/store";
import {routes} from "./app.routes";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
import { MaterialModule } from './material.module';

export function startupUser(startupService: InitUserService){
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
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
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
