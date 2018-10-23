import {Component, ChangeDetectionStrategy, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {FormGroup, Validators, FormControl,  AbstractControl } from "@angular/forms";
import { RootStoreFacade } from "../store";
import { User } from "../models/user.model";

@Component({
  selector: 'settings',
  templateUrl: "./settings.html",
  styleUrls: ["./settings.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class SettingsComponent implements OnInit{
  user : User;
  changePasswordForm: FormGroup
  newPasswordModel: string;
  constructor(private userService: UserService, private rootStore: RootStoreFacade){
    this.user = this.userService.user;
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
  
  passwordMatchValidator(ctrl: AbstractControl){
    return ctrl.value === this.newPasswordModel
    ? null : {'mismatch': true};
  }

  changePassword(){
    if(this.changePasswordForm.valid){
      this.userService.changePassword(this.currentPassword.value, this.newPassword.value)
    }
    else{
      this.rootStore.addError('Please fix the errors below');
    }
  }


  ngOnInit(){
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128), this.passwordMatchValidator.bind(this)]),
    });
    
    
    function passwordMatchValidator(g: FormGroup) {
       return g.get('newPassword').value === g.get('confirmPassword').value
          ? null : {'mismatch': true};
    }

  }
}
