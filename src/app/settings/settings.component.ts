import {Component, ChangeDetectionStrategy, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import * as fromRoot from '../reducers'
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {User} from "../stores/user.store";
import * as flashActions from '../actions/flash.actions';
import {FormGroup, Validators, FormControl,  AbstractControl } from "@angular/forms";

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
  constructor(private userService: UserService, private store: Store<fromRoot.State>){
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
      this.store.dispatch({type: flashActions.ADD_ERROR, payload: 'Please fix the errors below'});
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
