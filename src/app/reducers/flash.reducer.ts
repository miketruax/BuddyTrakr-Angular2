import { Action } from '@ngrx/store';
import  * as FlashActions  from '../actions/flash.actions';
import {Flash} from "../stores/flash.store";

export type State = Flash


const initialState: State = {};


export
function flashReducer(state = initialState, action: FlashActions.Actions): any{

  switch (action.type) {

    case FlashActions.ADD_FLASH:
      return {type: action.payload.type, message: action.payload.message};

    case FlashActions.CLEAR_FLASH:
      return {};

    default:
      return state;
  }
}

export const getFlash = (state: State) => state;
export const getType = (state: State) => state.type;
export const getMessage = (state: State) => state.message;
