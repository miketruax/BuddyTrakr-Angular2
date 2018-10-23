import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromBuddies from '../reducers/buddies.reducer';

export const getCompleteBuddiesState = createSelector(
  fromFeature.getBuddiesState,
  (state: fromFeature.BuddiesState) => state.buddies
);

  
  


