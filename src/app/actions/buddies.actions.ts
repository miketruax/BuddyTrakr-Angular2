import {
  Action,
} from '@ngrx/store';
import {Injectable} from "@angular/core";
import {Buddy} from "../stores/buddy.store";


@Injectable()
export class Actions {
  static ADD_BUDDIES = '[Buddies] Add Buddies';
  addBuddies(buddies): Action {
    return {
      type: Actions.ADD_BUDDIES,
      payload: buddies
    };
  }

  static CREATE_BUDDY = '[Buddy] Create Buddy';
  createBuddies(buddy): Action {
    return {
      type: Actions.CREATE_BUDDY,
      payload: buddy
    }
  }

  static UPDATE_BUDDY = '[Buddy] Create Buddy';
  updateBuddies(buddy): Action {
    return {
      type: Actions.UPDATE_BUDDY,
      payload: buddy
    }
  }

  static DELETE_BUDDY = '[Buddy] Delete Buddy';
  deleteBuddies(number): Action {
    return {
      type: Actions.DELETE_BUDDY,
      payload: number
    }
  }


}
