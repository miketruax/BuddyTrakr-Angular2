import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable()
export class AuthGeneric implements CanActivate {
  constructor(private userService:UserService, private router:Router) { }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    if(this.userService.isLoggedIn){
      this.router.navigate(['/buddies']);
    }
    console.log(this.userService.isLoggedIn);
    return !this.userService.isLoggedIn
  }
}

