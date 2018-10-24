import { Injectable } from '@angular/core';
import {Router, CanActivate, CanLoad} from '@angular/router';
import {UserService} from "./user.service";

@Injectable()
export class AuthProtected implements CanActivate{
  constructor(private userService:UserService, private router:Router) { }

  canActivate() {
    if(!this.userService.isLoggedIn){
      this.router.navigate(['/login']);
    }
    return this.userService.isLoggedIn;
  }

}

