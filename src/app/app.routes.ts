import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AboutComponent} from "./about/about.component";
import {SignupComponent} from "./signup/signup.component";
import {AuthProtected} from "./services/auth-protected.service";
import {AuthGeneric} from "./services/auth-generic.service"
import {SettingsComponent} from "./settings/settings.component";

export const routes: Routes = [
  { path: '',   redirectTo: '/buddies', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent, canActivate:[AuthGeneric], data: {animation: 'LoginPage'}},
  { path: 'buddies', loadChildren: './buddies/buddies.module', data: {animation: 'BuddyPage'} },
  { path: 'about', component: AboutComponent, data: {animation: 'AboutPage'} },
  { path: 'settings', component: SettingsComponent, canActivate:[AuthProtected], data: {animation: 'SettingsPage'} },
  { path: 'signup', component: SignupComponent, canActivate:[AuthGeneric], data: {animation: 'SignupPage'}},
  { path: '**',   redirectTo: '/buddies', pathMatch: 'full' },
];
