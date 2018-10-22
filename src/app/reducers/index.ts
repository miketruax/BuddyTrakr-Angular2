import {
  ActionReducerMap, createSelector
} from '@ngrx/store'

import * as fromBuddies from '../buddies/reducers/buddies.reducer';
import * as fromUser from './user.reducer'
import * as fromFlash from './flash.reducer'


export interface State {
  buddies: fromBuddies.State,
  user: fromUser.State
  flash: fromFlash.State
}

export const reducers: ActionReducerMap<State> = {
  buddies: fromBuddies.buddyReducer,
  user: fromUser.userReducer,
  flash: fromFlash.flashReducer
};




export const getBuddiesState = (state: State) => state.buddies;
  export const getBuddies = createSelector(getBuddiesState, fromBuddies.getBuddies);

export const getUserState = (state: State) => state.user;
  export const getUser = createSelector(getUserState, fromUser.getUser);
  export const getUserId = createSelector(getUserState, fromUser.getId);
  export const getUserFriends = createSelector(getUserState, fromUser.getFriends);
  export const getUsername = createSelector(getUserState, fromUser.getUsername);

export const getFlashState = (state: State) => state.flash;
  export const getFlash = createSelector(getFlashState, fromFlash.getFlash);
  export const getType = createSelector(getFlashState, fromFlash.getType);
  export const getMessage = createSelector(getFlashState, fromFlash.getMessage);
