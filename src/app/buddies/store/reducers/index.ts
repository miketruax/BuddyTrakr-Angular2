import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
  import * as fromBuddies from './buddies.reducer'; 

  
  
  export interface BuddiesState {
    buddies: fromBuddies.BuddiesState
  }
  
  export const reducers: ActionReducerMap<BuddiesState> = {
    buddies: fromBuddies.buddyReducer
  };
  
  export const getBuddiesState = createFeatureSelector<BuddiesState>('buddies');
  