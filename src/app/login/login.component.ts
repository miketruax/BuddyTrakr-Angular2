

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
  template: require('./login.html'),
  styleUrls: ['../styles/app.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent {
  private user: Observable<User>;
  constructor(private userService: UserService, private store: Store<fromRoot.State>) {
  this.user = this.store.select(fromRoot.getUserState);
  }

  login(e, username: string, password: string) {
    e.preventDefault();
    this.userService.login(username, password);

  }

  ngOnInit() {
  }
}
