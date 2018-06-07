import {Action} from '@ngrx/store';
import {Flash} from '../stores/flash.store'

export const ADD_FLASH = '[Flash] Add Flash';
export const CLEAR_FLASH = '[Flash] Clear Flash';



export class AddFlash implements Action {
  readonly type = ADD_FLASH;

  constructor(public payload: Flash) {
  }
}


export class ClearFlash implements Action {
  readonly type = CLEAR_FLASH;
  constructor(public payload = null) {
  }
}

export type Actions = AddFlash | ClearFlash;
