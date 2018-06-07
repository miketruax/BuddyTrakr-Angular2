import {Action} from '@ngrx/store';
import {User} from '../stores/user.store';

export const SELECT_USER = '[Selected User] Select User';
export const CLEAR_USER = '[User] Clear User';


export class SelectUser implements Action {

  readonly type = SELECT_USER;

  constructor(public payload: User) {
  }
}

export class ClearUser implements Action {
  readonly type = CLEAR_USER

}
