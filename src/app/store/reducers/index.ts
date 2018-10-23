import {
  ActionReducerMap, createSelector
} from '@ngrx/store'

import * as fromUser from './user.reducer'
import * as fromFlash from './flash.reducer'


export interface RootState {

  user: fromUser.UserState
  flash: fromFlash.FlashState
}

export const reducers: ActionReducerMap<RootState> = {

  user: fromUser.userReducer,
  flash: fromFlash.flashReducer
};


export const getUserState = (state: RootState) => state.user;
export const getFlashState = (state: RootState) => state.flash;

