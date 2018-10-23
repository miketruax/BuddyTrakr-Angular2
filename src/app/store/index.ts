import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {User} from '../models/user.model'
import * as fromActions from './actions'
import * as fromReducers from './reducers'
import * as fromSelectors from './selectors'

@Injectable({providedIn: 'root'})

export class RootStoreFacade{
  flash$ = this.store.pipe(select(fromSelectors.getFlash));
  user$ = this.store.pipe(select(fromSelectors.getUser));
  constructor(private store: Store<fromReducers.RootState>){

  }

  addError(msg: string){
    this.store.dispatch(new fromActions.AddError(msg))
  }

  addSuccess(msg: string){
    this.store.dispatch(new fromActions.AddSuccess(msg))
  }

  clearFlash(){
    this.store.dispatch(new fromActions.ClearFlash())
  }

  selectUser(user:User){
    this.store.dispatch(new fromActions.SelectUser(user))
  }
  clearUser(){
    this.store.dispatch(new fromActions.ClearUser(null));
  }
  
}