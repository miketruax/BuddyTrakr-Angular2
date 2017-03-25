import { Action } from '@ngrx/store';
import  * as errors  from '../actions/flash.actions';
import {Flash} from "../stores/flash.store";

export type State = Flash


const initialState: State = {};


export default
function(state = initialState, action: Action): any{

  switch (action.type) {

    case errors.Actions.ADD_ERROR:
      return {error: action.payload, success: state.success};

    case errors.Actions.ADD_SUCCESS:
      return {success: action.payload, error: state.error};

    case errors.Actions.CLEAR_ERROR:
      return {success: state.success};

    case errors.Actions.CLEAR_SUCCESS:
      return {error: state.error};

    case errors.Actions.CLEAR_FLASH:
      return {};

    default:
      return state;
  }
};

export const getFlash = (state: State) => state;
export const getError = (state: State) => state.error;
export const getSuccess = (state: State) => state.success;
