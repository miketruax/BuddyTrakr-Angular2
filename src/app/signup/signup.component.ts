//Signup component
import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import { CrossFieldMatcher } from '../shared/classes/cross-field-match.class';
import { passwordMatchValidator } from '../shared/functions/password-match-validator.function';


@Component({
  selector: 'signup',
  templateUrl: "./signup.component.html",
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {
  signupForm: FormGroup;
  matcher: CrossFieldMatcher
  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.matcher = new CrossFieldMatcher();
  }

  get username(){
    return this.signupForm.get('username')
  }

  get email(){
    return this.signupForm.get('email')
  }
  get password(){
    return this.signupForm.get('password')
  }

  get confirmPassword(){
    return this.signupForm.get('confirmPassword')
  }

  signup(e) {
    e.preventDefault();
    if(this.signupForm.valid){
      this.userService.signup(this.username.value, this.password.value, this.email.value);
    }
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.compose([Validators.required, Validators.maxLength(16), Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(128), Validators.minLength(8)])],
      confirmPassword: ['' ]
    }, {validator: passwordMatchValidator});

}}
