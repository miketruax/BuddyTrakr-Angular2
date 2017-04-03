
import {Component, ChangeDetectionStrategy} from "@angular/core";
import {UserService} from "../services/user.service";
import * as fromRoot from '../reducers'
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {User} from "../stores/user.store";
import * as flashActions from '../actions/flash.actions';

@Component({
  selector: 'settings',
  template: require('./settings.html'),
  styleUrls: ['../styles/app.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class SettingsComponent {
  user : Observable<User>;
  errors: Object;
  form: Object;
  constructor(private userService: UserService, private store: Store<fromRoot.State>){
    this.user = this.store.select(fromRoot.getUser);
    this.errors = {};
    this.form = {currentPassword: '', newPassword: '', confirmNewPassword: ''};
  }

  validate(){
    let errors = false;
    if(!(this.form['currentPassword'])){
      this.errors['currentPassword'] = "Must enter your current password";
      this.store.dispatch({type: flashActions.Actions.ADD_ERROR, payload: 'Please fix errors below'});
      errors = true;
    }
    if(!(this.form['newPassword'] && this.form['newPassword'].length >= 8 && this.form['newPassword'].length <= 128)){
      this.errors['newPassword'] = "Your new password must be between 8 and 128 characters";
      this.store.dispatch({type: flashActions.Actions.ADD_ERROR, payload: 'Please fix errors below'});
      errors = true;
    }
    if(this.form['confirmNewPassword'] !== this.form['newPassword']){
      this.errors['confirmNewPassword'] = "Passwords do not match";
      this.store.dispatch({type: flashActions.Actions.ADD_ERROR, payload: 'Please fix errors below'});
      errors = true;
    }
    return errors;
  }

  changePassword(){
    this.errors = {};
    if(!this.validate()){
      this.userService.changePassword(this.form['currentPassword'], this.form['newPassword'])
    }
    else{
      this.store.dispatch({type: flashActions.Actions.ADD_ERROR, payload: 'Please fix the errors below'})
    }
  }
}
