import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {User} from "../stores/user.store";


@Injectable()
export class authGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(user: User) {
    if (user._id === 'blank') {
      this.router.navigate(['/login']);
      return false;
    }
    else
      return true;
  }
}
