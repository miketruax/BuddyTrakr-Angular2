

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
  providers: [UserService],
  template: require('./login.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent {
  private user: Observable<User>;
  constructor(private userService: UserService, private store: Store<fromRoot.State>) {
  this.store.select('user');
  }

  login(e, password: string, username: string) {
    e.preventDefault();
    this.userService.login(password, username);

  }

  showUser(){
    console.log('USER is:', this.user);
  }


  resetUser() {
    this.store.dispatch({
      type: 'SELECT_USER',
      payload: {}
    });
  }

  logout() {
    this.userService.logout();
    this.resetUser();
  }
}
