import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import reducer from './reducers'
import { AppComponent } from './app.component';
import {StoreModule} from "@ngrx/store";
import {routes} from "./app.routes";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {BuddiesComponent} from "./buddies/buddies.component";
import {AboutComponent} from "./about/about.component";
import {BuddyListComponent} from './buddies/buddy-list.component'
import {BuddyDetailsComponent} from './buddies/buddy-details.component'
import {AuthService} from "./services/auth.service";
import {UserService} from './services/user.service'
import {FlashComponent} from "./flash/flash.component";
import {CheckedIn} from "./pipes/checked-in.pipe";
import {CheckedOut} from "./pipes/checked-out.pipe";
import {BuddyFilter} from "./pipes/buddy-filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    FlashComponent,
    LoginComponent, BuddiesComponent, AboutComponent,
    BuddyDetailsComponent, BuddyListComponent,
    CheckedIn,
    CheckedOut,
    BuddyFilter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    StoreModule.provideStore(reducer)
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
