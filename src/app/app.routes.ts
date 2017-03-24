import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BuddiesComponent } from './buddies/buddies.component';
import {AboutComponent} from "./about/about.component";
import {AuthService} from "./services/auth.service"
export const routes: Routes = [
  // { path: '',       component: LoginComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'buddies', component: BuddiesComponent, canActivate: [AuthService] },
  { path: 'about', component: AboutComponent },
  { path: '**',     component: LoginComponent },
];
