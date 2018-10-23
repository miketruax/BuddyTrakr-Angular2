import * as fromUser from '../reducers/user.reducer'
import * as fromRoot from '../reducers/'
import { createSelector } from '@ngrx/store';

  export const getUser = createSelector(fromRoot.getUserState, fromUser.getUser);
  export const getUserId = createSelector(fromRoot.getUserState, fromUser.getId);
  export const getUserFriends = createSelector(fromRoot.getUserState, fromUser.getFriends);
  export const getUsername = createSelector(fromRoot.getUserState, fromUser.getUsername);