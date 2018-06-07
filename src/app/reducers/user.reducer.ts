import  * as UserActions  from '../actions/user.actions';
import {User} from "../stores/user.store";

export type State = User

const initialState: State = {};


export
function userReducer(state = initialState, action: UserActions.Actions): any{
  switch (action.type) {
    case UserActions.SELECT_USER:
      return action.payload;

    case UserActions.CLEAR_USER:
      return {};
    default:
      return state;
  }
};

export const getUser = (state: State) => state;

export const getUsername = (state: State) => state.username;

export const getFriends = (state: State) => state.friends;

export const getId = (state: State) => state._id;

