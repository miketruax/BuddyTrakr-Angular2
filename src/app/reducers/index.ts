import {
  ActionReducerMap, createSelector
} from '@ngrx/store'

import * as fromBuddies from './buddies.reducer';
import * as fromSelectedBuddy from './selectedBuddy.reducer'
import * as fromUser from './user.reducer'
import * as fromFlash from './flash.reducer'


export interface State {
  buddies: fromBuddies.State,
  selectedBuddy: fromSelectedBuddy.State,
  user: fromUser.State
  flash: fromFlash.State
}

export const reducers: ActionReducerMap<State> = {
  buddies: fromBuddies.buddyReducer,
  selectedBuddy: fromSelectedBuddy.selectedReducer,
  user: fromUser.userReducer,
  flash: fromFlash.flashReducer
};




export const getBuddiesState = (state: State) => state.buddies;
  export const getBuddies = createSelector(getBuddiesState, fromBuddies.getBuddies);

export const getSelectedBuddiesState = (state:State)=> state.selectedBuddy;
  export const getBuddy = createSelector(getSelectedBuddiesState, fromSelectedBuddy.getBuddy);
  export const getID = createSelector(getSelectedBuddiesState, fromSelectedBuddy.getID);
  export const getBuddyName = createSelector(getSelectedBuddiesState, fromSelectedBuddy.getBuddyName);
  export const getBuddySpecies = createSelector(getSelectedBuddiesState, fromSelectedBuddy.getBuddySpecies);
  export const getBuddyBinomial = createSelector(getSelectedBuddiesState, fromSelectedBuddy.getBuddyBinomial);
  export const getBuddyDescription = createSelector(getSelectedBuddiesState, fromSelectedBuddy.getBuddyDescription);
  export const getBuddyTimesOut = createSelector(getSelectedBuddiesState, fromSelectedBuddy.getBuddyTimesOut);
  export const getBuddyCheckedOut = createSelector(getSelectedBuddiesState, fromSelectedBuddy.getBuddyCheckedOut);
  export const getBuddyTotalDaysOut = createSelector(getSelectedBuddiesState, fromSelectedBuddy.getBuddyTotalDaysOut);
  export const getBuddyLastOutDate = createSelector(getSelectedBuddiesState, fromSelectedBuddy.getBuddyLastOutDate);
  export const getBuddyLastOutDays = createSelector(getSelectedBuddiesState, fromSelectedBuddy.getBuddyLastOutDays);

export const getUserState = (state: State) => state.user;
  export const getUser = createSelector(getUserState, fromUser.getUser);
  export const getUserId = createSelector(getUserState, fromUser.getId);
  export const getUserFriends = createSelector(getUserState, fromUser.getFriends);
  export const getUsername = createSelector(getUserState, fromUser.getUsername);

export const getFlashState = (state: State) => state.flash;
  export const getFlash = createSelector(getFlashState, fromFlash.getFlash);
  export const getType = createSelector(getFlashState, fromFlash.getType);
  export const getMessage = createSelector(getFlashState, fromFlash.getMessage);
