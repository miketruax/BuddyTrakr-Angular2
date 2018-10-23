import { Action } from '@ngrx/store';
import  * as FlashActions  from '../actions/flash.actions';
import {Flash} from '../../models/flash.model'

export type FlashState = Flash


const initialState: FlashState = {};


export
function flashReducer(state = initialState, action: FlashActions.FlashActions): any{

  switch (action.type) {

    case FlashActions.ADD_SUCCESS:
      return {type: 'success', message: action.payload};

    case FlashActions.ADD_ERROR:
      return {type: 'error', message: action.payload};


    case FlashActions.CLEAR_FLASH:
      return {};

    default:
      return state;
  }
}

export const getFlash = (state: FlashState) => state;
export const getType = (state: FlashState) => state.type;
export const getMessage = (state: FlashState) => state.message;
