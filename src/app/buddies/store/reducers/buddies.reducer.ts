import * as BuddyActions from '../actions/buddies.actions';
import {Buddy} from "../../models/buddy.model";

export type BuddiesState = Buddy[]

const initialState: BuddiesState = [];

let sortNames = (a, b) => {
  return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0
}

export function buddyReducer (state = initialState, action: BuddyActions.Actions): any{
  switch (action.type) {

    case BuddyActions.ADD_BUDDIES:
      return action.payload.sort(sortNames)

    case BuddyActions.CREATE_BUDDY:
      let newState = [...state, action.payload].sort(sortNames);
      return newState


    case BuddyActions.UPDATE_BUDDY:
      return state.map(buddy => {
        return buddy.id === action.payload['id']
          ? Object.assign({}, buddy, action.payload) : buddy;
      }).sort(sortNames);


    case BuddyActions.DELETE_BUDDY:
      return state.filter(buddy => {
        return buddy.id !== action.payload;
      });


    default:
      return state;
  }
}

export const getBuddies = (state: BuddiesState) => state;
