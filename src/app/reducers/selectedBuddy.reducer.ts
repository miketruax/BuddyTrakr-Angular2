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

export const getBuddy = (state: State) => state;
export const getID = (state: State) => state._id;
export const getBuddyName = (state: State) => state.name;
export const getBuddySpecies = (state: State) => state.species;
export const getBuddyBinomial = (state: State) => state.binomial;
export const getBuddyDescription = (state: State) => state.description;
export const getBuddyTimesOut = (state: State) => state.timesOut;
export const getBuddyCheckedOut = (state: State) => state.checkedOut;
export const getBuddyTotalDaysOut = (state: State) => state.totalDaysOut;
export const getBuddyLastOutDate = (state: State) => state.lastOutDate;
export const getBuddyLastOutDays = (state: State) => state.lastOutDays;


