
import {Component, ChangeDetectionStrategy} from "@angular/core";
import {UserService} from "../services/user.service";
import * as fromRoot from '../reducers'
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {User} from "../stores/user.store";
import * as flashActions from '../actions/flash.actions';

@Component({
  selector: 'settings',
  templateUrl: "./settings.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class SettingsComponent {
  public user : Observable<User>;
  public errors: any = {};
  public form: any = {currentPassword: '', newPassword: '', confirmNewPassword: ''};
  constructor(private userService: UserService, private store: Store<fromRoot.State>){
    this.user = this.store.select(fromRoot.getUser);
  }

  validate(){
    let errors = false;
    if(!(this.form['currentPassword'])){
      this.errors['currentPassword'] = "Must enter your current password";
      errors = true;
    }
    if(!(this.form['newPassword'] && this.form['newPassword'].length >= 8 && this.form['newPassword'].length <= 128)){
      this.errors['newPassword'] = "Your new password must be between 8 and 128 characters";
      errors = true;
    }
    if(this.form['confirmNewPassword'] !== this.form['newPassword']){
      this.errors['confirmNewPassword'] = "Passwords do not match";

      errors = true;
    }
    return errors;
  }

  changePassword(e){
    this.errors = {};
    if(!this.validate()){
      this.userService.changePassword(this.form['currentPassword'], this.form['newPassword'])
    }
    else{
      this.store.dispatch({type: flashActions.ADD_ERROR, payload: 'Please fix the errors below'})
    }
  }
}
