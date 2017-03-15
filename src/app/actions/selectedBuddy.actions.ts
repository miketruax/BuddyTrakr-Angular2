import {
  Action,
} from '@ngrx/store';
import {Injectable} from "@angular/core";

@Injectable()
export class Actions {
  static SELECT_BUDDY = '[Selected Buddy] Select Buddy';
  selectBuddy(Buddy): Action {
    return {
      type: Actions.SELECT_BUDDY,
      payload: Buddy
    };
  }

  static CLEAR_BUDDY = '[Selected Buddy] Clear Buddy';
  clearBuddy(): Action {
    return {
      type: Actions.CLEAR_BUDDY
    }
  }


}

