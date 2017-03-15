import { Action } from '@ngrx/store';
import  * as buddies  from '../actions/buddies.actions';
import {forEach} from "@angular/router/src/utils/collection";
import {Buddy} from "../stores/buddy.store";

export type State = Buddy[]

const initialState: State = [];


export default
function(state = initialState, action: Action): any{

  switch (action.type) {

    case buddies.Actions.ADD_BUDDIES:
      return action.payload;

    case buddies.Actions.CREATE_BUDDY:
      return [...state, action.payload];

    case buddies.Actions.UPDATE_BUDDY:
      return state.map(buddy => {

        return buddy._id === action.payload._id
          ? Object.assign({}, buddy, action.payload) : buddy;
      });

    case buddies.Actions.DELETE_BUDDY:
      return state.filter(buddy => {
        return buddy._id !== action.payload._id;
      });

    default:
      return state;
  }
};


