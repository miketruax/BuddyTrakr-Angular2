import {
  Action,
} from '@ngrx/store';
import {Injectable} from "@angular/core";

@Injectable()
export class Actions {
  static SELECT_USER = '[Selected User] Select User';
  selectUser(user): Action {
    return {
      type: Actions.SELECT_USER,
      payload: user
    };
  }

  static CLEAR_USER = '[User] Clear User';
  clearUser(): Action {
    return {
      type: Actions.CLEAR_USER
    }
  }


}
