import { Action } from '@ngrx/store';
import * as BuddyActions from '../actions/buddies.actions';
import  * as buddies  from '../actions/buddies.actions';
import {Buddy} from "../stores/buddy.store";

export type State = Buddy[]

const initialState: State = [];


export function buddyReducer (state = initialState, action: BuddyActions.Actions): any{
  switch (action.type) {

    case BuddyActions.ADD_BUDDIES:
      return action.payload;

    case BuddyActions.CREATE_BUDDY:
      return [...state, action.payload];

    case BuddyActions.UPDATE_BUDDY:
      return state.map(buddy => {
        return buddy._id === action.payload['_id']
          ? Object.assign({}, buddy, action.payload) : buddy;
      });

    case BuddyActions.DELETE_BUDDY:
      return state.filter(buddy => {
        return buddy._id !== action.payload['_id'];
      });

    default:
      return state;
  }
}

export const getBuddies = (state: State) => state;
