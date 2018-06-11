

//Login Component

import {Component, ChangeDetectionStrategy} from '@angular/core';

import {UserService} from '../services/user.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'login',
  styleUrls:['./login.component.scss'],
  templateUrl: "./login.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent {
  password: string;
  username: string;
  loginForm: FormGroup;
  constructor(private userService: UserService, private formBuilder: FormBuilder) {

  }

  login(e) {
    e.preventDefault();
    if(this.loginForm.valid){
      this.userService.login(this.username, this.password);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [this.username, Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(3)])],
      password: [this.password, Validators.compose([Validators.required, Validators.maxLength(128), Validators.minLength(8)])]
  
    });
  }
}
