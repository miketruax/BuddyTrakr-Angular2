import * as fromFlash from '../reducers/flash.reducer'
import * as fromRoot from '../reducers'
import { createSelector } from '@ngrx/store';

export const getFlash = createSelector(fromRoot.getFlashState, fromFlash.getFlash);
export const getType = createSelector(fromRoot.getFlashState, fromFlash.getType);
export const getMessage = createSelector(fromRoot.getFlashState, fromFlash.getMessage);