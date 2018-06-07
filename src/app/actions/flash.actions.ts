import {Action} from '@ngrx/store';
import {Flash} from '../stores/flash.store'

export const ADD_ERROR = '[Flash] Add Errors';
export const ADD_SUCCESS = '[Flash] Add Success';
export const CLEAR_FLASH = '[Flash] Clear Flash';

export class AddError implements Action {
  readonly type = ADD_ERROR;

  constructor(public payload: Flash) {
  }
}

export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: Flash) {
  }
}


export class ClearFlash implements Action {
  readonly type = CLEAR_FLASH;
}

export type Actions = AddError | AddSuccess | ClearFlash;
