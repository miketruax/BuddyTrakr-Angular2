

//Signup component

import {Component,
  ChangeDetectionStrategy} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as flashActions from '../actions/flash.actions';

import {User} from '../stores/user.store';
import {UserService} from '../services/user.service';


@Component({
  selector: 'signup',
  templateUrl: "./signup.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignupComponent {
  user: User = {username: '', email: '', password: ''};
  errors: any = {};
  confirmPswd: string;
  constructor(private userService: UserService, private store: Store<fromRoot.State>) {
  }

  validate(){
    let errors = false;
    if(!(this.user.username && this.user.username.length >= 3 && this.user.username.length <= 16)){
      this.errors['username'] = "Username must be between 3 and 16 characters";
      this.store.dispatch({type: flashActions.ADD_FLASH, payload:{type: 'error', message:  'Please fix errors below'}});
      errors = true;
    }
    if(!(this.user.email && this.user.email.length >= 5 && this.user.email.length <= 256)){
      this.errors['email'] = "Email must be between 5 and 256 characters";
      this.store.dispatch({type: flashActions.ADD_FLASH, payload:{type: 'error', message:  'Please fix errors below'}});
      errors = true;
    }
    if(!(this.user.password && this.user.password.length >= 8 && this.user.password.length <= 128)){
      this.errors['password'] = "Password must be between 8 and 128 characters";
      this.store.dispatch({type: flashActions.ADD_FLASH, payload:{type: 'error', message:  'Please fix errors below'}});
      errors = true;
    }
    if(this.user.password !== this.confirmPswd){
      this.errors['cPassword'] = "Passwords do not match";
      this.store.dispatch({type: flashActions.ADD_FLASH, payload:{type: 'error', message:  'Please fix errors below'}});
      errors = true;
    }
    return errors;
  }

  signup(e) {
    e.preventDefault();
    this.store.dispatch({type: flashActions.CLEAR_FLASH});
    this.errors = {};
    if(!this.validate()){
      this.userService.signup(this.user.username, this.user.password, this.user.email);
    }
  }

  ngOnInit() {

  }
}
