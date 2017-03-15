

//Login Component

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppStore} from '../app.store';

import {User} from './user.store';
import {UserService} from './user.service';


@Component({
  selector: 'login',
  providers: [UserService],
  template: require('./login.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Login {
  constructor(private userService: UserService, store: Store<fromRoot.State>) {
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
