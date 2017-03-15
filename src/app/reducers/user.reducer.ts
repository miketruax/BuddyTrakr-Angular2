import { Action } from '@ngrx/store';
import  * as user  from '../actions/user.actions';
import {forEach} from "@angular/router/src/utils/collection";
import {User} from "../stores/user.store";

export type State = User

const initialState: State = {};


export default
function(state = initialState, action: Action): any{
  switch (action.type) {
    // new array
    case user.Actions.SELECT_USER:
      return action.payload;

    case user.Actions.CLEAR_USER:
      return {};
    default:
      return state;
  }
};


