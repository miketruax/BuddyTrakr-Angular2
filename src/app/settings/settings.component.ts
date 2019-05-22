import {Component,  OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {FormGroup, Validators, FormBuilder } from "@angular/forms";
import { RootStoreFacade } from "../store";
import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { passwordMatchValidator } from "../shared/functions/password-match-validator.function";
import { CrossFieldMatcher } from "../shared/classes/cross-field-match.class";

@Component({
  selector: 'settings',
  templateUrl: "./settings.html",
  styleUrls: ["./settings.component.scss"]
})


export class SettingsComponent implements OnInit{
  user : Observable<User>;  
  changePasswordForm: FormGroup
  matcher: CrossFieldMatcher;
  constructor(private userService: UserService, private rootStore: RootStoreFacade, private formBuilder: FormBuilder){
    this.user = this.rootStore.user$;
    this.matcher = new CrossFieldMatcher();
  }

  get currentPassword(){
    return this.changePasswordForm.get('currentPassword')
  }

  get newPassword(){
    return this.changePasswordForm.get('newPassword')
  }

  get confirmPassword(){
    return this.changePasswordForm.get('confirmPassword')
  }

  changePassword(){
    if(this.changePasswordForm.valid){
      this.userService.changePassword(this.currentPassword.value, this.newPassword.value)
    }
  }


  ngOnInit(){
      this.changePasswordForm = this.formBuilder.group({
        currentPassword: ['', Validators.compose([Validators.required, Validators.maxLength(128), Validators.minLength(8)])],
        newPassword: ['', Validators.compose([Validators.required, Validators.maxLength(128), Validators.minLength(8)])],
        confirmPassword: ['']
      }, {validator: passwordMatchValidator});
    };
  }
