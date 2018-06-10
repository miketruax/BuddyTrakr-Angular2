import {Action} from '@ngrx/store';

import {Buddy} from "../stores/buddy.store";

export const DELETE_BUDDY = '[Buddy] Delete Buddy';
export const ADD_BUDDIES = '[Buddies] Add Buddies';
export const CREATE_BUDDY = '[Buddy] Create Buddy';
export const UPDATE_BUDDY = '[Buddy] Update Buddy';


export class AddBuddies implements Action {
  readonly type = ADD_BUDDIES;

  constructor(public payload: Buddy[]) {
  }
}


export class CreateBuddies implements Action {
  readonly type = CREATE_BUDDY;

  constructor(public payload: Buddy) {
  }
}


export class UpdateBuddies implements Action {

  readonly type = UPDATE_BUDDY;

  constructor(public payload: Buddy) {
  }
}

export class DeleteBuddies implements Action {

  readonly type = DELETE_BUDDY;

  constructor(public payload: number) {
  }
}

export type Actions = AddBuddies | CreateBuddies | UpdateBuddies | DeleteBuddies;
