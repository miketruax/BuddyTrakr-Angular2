import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Buddy} from '../models/buddy.model'
import * as fromActions from './actions/'
import * as fromReducers from './reducers/'
import * as fromSelectors from './selectors'

@Injectable({providedIn: 'root'})

export class BuddyStoreFacade{
  buddies$ = this.store.pipe(select(fromSelectors.getCompleteBuddiesState))

  constructor(private store: Store<fromReducers.BuddiesState>){

  }

  createBuddy(buddy: Buddy){
    this.store.dispatch(new fromActions.CreateBuddies(buddy))
  }

  updateBuddy(buddy: Buddy){
    this.store.dispatch(new fromActions.UpdateBuddies(buddy))
  }

  deleteBuddy(id: number){
    this.store.dispatch(new fromActions.DeleteBuddies(id))
  }

  addBuddies(buddies: Buddy[]){
    this.store.dispatch(new fromActions.AddBuddies(buddies));
  }
}
