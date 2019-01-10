import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGeneric implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate() {
    if(!this.userService.isLoggedIn){
      return true;
    }
    this.router.navigate(['/buddies'])
    return false
  }
}

