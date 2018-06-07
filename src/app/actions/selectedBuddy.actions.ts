import {Action} from '@ngrx/store';
import {Buddy} from "../stores/buddy.store";

export const SELECT_BUDDY = '[Selected Buddy] Select Buddy';
export const CLEAR_BUDDY = '[Selected Buddy] Clear Buddy';

  export class SelectBuddy implements Action {
    readonly type = SELECT_BUDDY;
    constructor(public payload: Buddy){}
  }

  export class ClearBuddy implements Action{
    readonly type = CLEAR_BUDDY;
    constructor(public payload: null){}
  }

export type Actions = SelectBuddy | ClearBuddy;
