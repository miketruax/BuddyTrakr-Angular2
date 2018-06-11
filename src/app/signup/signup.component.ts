

//Signup component

import {Component,
  ChangeDetectionStrategy} from '@angular/core';

import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';

import {User} from '../stores/user.store';
import {UserService} from '../services/user.service';


@Component({
  selector: 'signup',
  templateUrl: "./signup.component.html",
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignupComponent {
  user: User = {username: '', email: '', password: ''};
  confirmPswd: string;
  signupForm: FormGroup;
  constructor(private userService: UserService, private store: Store<fromRoot.State>, private formBuilder: FormBuilder) {

  }

  signup(e) {
    e.preventDefault();
    if(this.signupForm.valid){
      this.userService.signup(this.user.username, this.user.password, this.user.email);
    }
  }

  passwordMatchValidator = function(control: FormControl) {
    if(!this.user.password && !control.dirty && control.untouched){
      return null;
    }
    return (this.user.password === this.confirmPswd) ? null : { 'mismatch': true };
}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: [this.user.username, Validators.compose([Validators.required, Validators.email])],
      username: [this.user.email, Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(3)])],
      password: [this.user.password, Validators.compose([Validators.required, Validators.maxLength(128), Validators.minLength(8)])],
      confirmpassword: [this.confirmPswd, Validators.compose([this.passwordMatchValidator.bind(this)])]
    });

}}
