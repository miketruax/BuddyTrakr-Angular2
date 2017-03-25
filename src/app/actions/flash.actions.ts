import {
  Action,
} from '@ngrx/store';
import {Injectable} from "@angular/core";


@Injectable()
export class Actions {
  static ADD_ERROR = '[Flash] Add Errors';
  addError(error): Action {
    return {
      type: Actions.ADD_ERROR,
      payload: error
    };
  }
  static ADD_SUCCESS = '[Flash] Add Success';
  addSuccess(success): Action {
    return {
      type: Actions.ADD_SUCCESS,
      payload: success
    };
  }
  static CLEAR_ERROR = '[Flash] Clear Errors';
  clearError(): Action {
    return {
      type: Actions.CLEAR_ERROR
    };
  }
  static CLEAR_SUCCESS = '[Flash] Clear Success';
  clearSuccess(): Action {
    return {
      type: Actions.CLEAR_SUCCESS
    };
  }


  static CLEAR_FLASH = '[Flash] Clear Flash';
  clearFlash(): Action {
    return {
      type: Actions.CLEAR_FLASH
    }
  }

}
