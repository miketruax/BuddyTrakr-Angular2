import {
  combineReducers
} from '@ngrx/store'

import * as fromBuddies from './buddies.reducer';
import * as fromSelectedBuddy from './selectedBuddy.reducer'
import * as fromUser from './user.reducer'
import { ActionReducer } from '@ngrx/store';
import {compose} from "@ngrx/core/compose";
;


export interface State {
  buddies: fromBuddies.State,
  selectedBuddy: fromSelectedBuddy.State,
  user: fromUser.State
}

const reducers = {
  buddies: fromBuddies.default,
  selectedBuddy: fromSelectedBuddy.default,
  user: fromUser.default
};


export default compose(combineReducers)({
  buddies: reducers.buddies,
  selectedBuddy: reducers.selectedBuddy,
  user: reducers.user
});


export const getBuddiesState = (state: State) => state.buddies;
export const getUserState = (state: State) => state.user;

