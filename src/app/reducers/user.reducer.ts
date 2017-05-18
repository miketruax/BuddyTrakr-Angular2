import { Action } from '@ngrx/store';
import  * as user  from '../actions/user.actions';
import {forEach} from "@angular/router/src/utils/collection";
import {User} from "../stores/user.store";

export type State = User

const initialState: State = {};


export
function userReducer(state = initialState, action: Action): any{
  switch (action.type) {
    case user.Actions.SELECT_USER:
      return action.payload;

    case user.Actions.CLEAR_USER:
      return {};
    default:
      return state;
  }
};

export const getUser = (state: State) => state;

export const getUsername = (state: State) => state.username;

export const getFriends = (state: State) => state.friends;

export const getId = (state: State) => state._id;

