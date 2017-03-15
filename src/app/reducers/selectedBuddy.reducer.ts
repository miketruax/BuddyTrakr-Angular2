import { Action } from '@ngrx/store';
import  * as selectedBuddy  from '../actions/selectedBuddy.actions';
import {forEach} from "@angular/router/src/utils/collection";
import {Buddy} from "../stores/buddy.store";

export type State = Buddy

const initialState: State = {};


export default
function(state = initialState, action: Action): any{
  switch (action.type) {
    case selectedBuddy.Actions.SELECT_BUDDY: {
      return action.payload
    }
    case selectedBuddy.Actions.CLEAR_BUDDY : {
      return {}
    }

    default:
      return state;
  }
};


