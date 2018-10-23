import {Action} from '@ngrx/store';

export const ADD_ERROR = '[Flash] Add Error';
export const ADD_SUCCESS = '[Flash] Add Success';
export const CLEAR_FLASH = '[Flash] Clear Flash';



export class AddError implements Action {
  readonly type = ADD_ERROR;

  constructor(public payload: string) {
  }
}

export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: string) {
  }
}


export class ClearFlash implements Action {
  readonly type = CLEAR_FLASH;
  constructor(public payload = null) {
  }
}

export type FlashActions = AddError | AddSuccess | ClearFlash;
