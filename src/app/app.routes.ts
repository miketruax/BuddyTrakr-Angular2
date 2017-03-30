import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BuddiesComponent } from './buddies/buddies.component';
import {AboutComponent} from "./about/about.component";
import {SignupComponent} from "./signup/signup.component";
import {AuthProtected} from "./services/auth-protected.service";
import {AuthGeneric} from "./services/auth-generic.service"
export const routes: Routes = [
  { path: '',   redirectTo: '/buddies', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent, canActivate:[AuthGeneric]},
  { path: 'buddies', component: BuddiesComponent, canActivate: [AuthProtected] },
  { path: 'about', component: AboutComponent },
  { path: 'signup', component: SignupComponent, canActivate:[AuthGeneric]},
  { path: '**',   redirectTo: '/buddies', pathMatch: 'full' },
];
