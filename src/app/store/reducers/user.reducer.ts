import  * as UserActions  from '../actions/user.actions';
import {User} from "../../models/user.model";

export type UserState = User

const initialState: UserState = {};


export
function userReducer(state = initialState, action: UserActions.UserActions): any{
  switch (action.type) {
    case UserActions.SELECT_USER:
      return action.payload;

    case UserActions.CLEAR_USER:
      return {};
    default:
      return state;
  }
};

export const getUser = (state: UserState) => state;

export const getUsername = (state: UserState) => state.username;

export const getFriends = (state: UserState) => state.friends;

export const getId = (state: UserState) => state._id;

