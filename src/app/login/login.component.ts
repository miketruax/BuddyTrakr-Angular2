

//Login Component

import {Component, ChangeDetectionStrategy} from '@angular/core';

import {UserService} from '../services/user.service';


@Component({
  selector: 'login',
  templateUrl: "./login.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent {
  password: string;
  username: string;
  constructor(private userService: UserService) {

  }

  login(e) {
    e.preventDefault();
    if(this.password && this.username){
      this.userService.login(this.username, this.password);
    }
  }

  ngOnInit() {
  }
}
