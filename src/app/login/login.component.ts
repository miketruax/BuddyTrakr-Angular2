

//Login Component

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';

import {User} from '../stores/user.store';
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
    this.userService.login(this.username, this.password);
  }

  ngOnInit() {
  }
}
