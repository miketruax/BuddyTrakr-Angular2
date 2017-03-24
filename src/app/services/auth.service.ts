import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable()
export class AuthService implements CanActivate {
  constructor(private userService:UserService, private router:Router) { }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    return this.userService.isLoggedIn().map(r => {
      if (r) {
        return true;
      }
    }).catch(() => {
      this.router.navigate(['/login']);
      return Observable.of(false);
    });
  }
}
