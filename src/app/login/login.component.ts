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
  loginForm: FormGroup;
  constructor(private userService: UserService, private formBuilder: FormBuilder) {

  }

  login(e) {
    e.preventDefault();
    if(this.loginForm.valid){
      this.userService.login(this.loginForm.value.username, this.loginForm.value.password);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(128), Validators.minLength(8)])]
  
    });
  }
}
