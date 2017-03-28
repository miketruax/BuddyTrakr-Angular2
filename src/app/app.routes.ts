import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BuddiesComponent } from './buddies/buddies.component';
import {AboutComponent} from "./about/about.component";
import {AuthService} from "./services/auth.service"
import {SignupComponent} from "./signup/signup.component";
export const routes: Routes = [
  { path: '',   redirectTo: '/buddies', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'buddies', component: BuddiesComponent, canActivate: [AuthService] },
  { path: 'about', component: AboutComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**',   redirectTo: '/buddies', pathMatch: 'full' },
];
