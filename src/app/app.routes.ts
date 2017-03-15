import { Routes } from '@angular/router';
import { Login } from './user/login.component';
import { Buddies } from './buddies/buddies.component';
import {About} from "./about/about.component";
import {authGuard} from "./services/auth.service"
export const routes: Routes = [
  { path: '',       component: Login },
  { path: '/login',  component: Login },
  { path: '/buddies', component: Buddies, canActivate: [authGuard] },
  { path: '/about', component: About },
  { path: '**',     component: Login },
];
