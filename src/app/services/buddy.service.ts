// # Buddy Service

import {Http, Headers} from '@angular/http';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as buddyActions from '../actions/buddies.actions';
import * as flashActions from '../actions/flash.actions';
import {Buddy} from '../stores/buddy.store';

import * as fromRoot from '../reducers';

const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class BuddyService {

  buddies: Observable<Array<Buddy>>;
  constructor(private http: Http, private store: Store<fromRoot.State>) {
    this.buddies = store.select('buddies');
  }

  loadBuddies() {
    let headers = new Headers();
    headers.append('Authorization', `JWT ${localStorage.getItem('authToken')}`);
        this.http.get('/api/buddy', {headers: headers})
            .map(res => res.json())
            .map(payload => {
              if(payload.err){
                return ({type: flashActions.Actions.ADD_ERROR, payload: payload.err})
              }
              return ({ type: buddyActions.Actions.ADD_BUDDIES, payload: payload.buddy })
            })
            .subscribe(action => this.store.dispatch(action));
    }

    saveBuddy(buddy: Buddy, bool: boolean = false) {
      this.store.dispatch({type: flashActions.Actions.CLEAR_FLASH});
        (buddy._id) ? this.updateBuddy(buddy, bool) : this.createBuddy(buddy);
    }

    createBuddy(buddy: Buddy) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `JWT ${localStorage.getItem('authToken')}`);
        this.http.post('/api/buddy', JSON.stringify(buddy), {headers: headers})
            .map(res => res.json())
          .map(payload => {
            if(payload.err){
              return ({type: flashActions.Actions.ADD_ERROR, payload: payload.err})
            }
            this.store.dispatch({type: flashActions.Actions.ADD_SUCCESS, payload: `${payload.buddy.name} successfully saved!`});
            return ({ type: buddyActions.Actions.CREATE_BUDDY, payload: payload.buddy })
          })
            .subscribe(action => this.store.dispatch(action));
    }

    updateBuddy(buddy: Buddy, bool: boolean = false) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `JWT ${localStorage.getItem('authToken')}`);
        this.http.put(`/api/buddy/${buddy._id}`, JSON.stringify(buddy), {headers: headers})
          .map(res => res.json())
          .map(payload => {
            if(payload.err){
              return ({type: flashActions.Actions.ADD_ERROR, payload: payload.err})
            }
            this.store.dispatch({
              type: flashActions.Actions.ADD_SUCCESS,
              payload: `${payload.buddy.name} successfully added!`});
            return ({ type: buddyActions.Actions.UPDATE_BUDDY, payload: payload.buddy })
          })
          .subscribe(action => {
            this.store.dispatch(action);
            this.loadBuddies();
          });
    }

    deleteBuddy(buddy: Buddy) {
      this.store.dispatch({type: flashActions.Actions.CLEAR_FLASH});
      let headers = new Headers();
      headers.append('Authorization', `JWT ${localStorage.getItem('authToken')}`);
        this.http.delete(`/api/buddy/${buddy._id}`, {headers: headers})
          .map(res => res.json())
          .map(payload => {
            if(payload.err){
              return ({type: flashActions.Actions.ADD_ERROR, payload: payload.err})
            }
            this.store.dispatch({
              type: flashActions.Actions.ADD_SUCCESS,
              payload: `${payload.buddy.name} successfully deleted!`});
            return ({ type: buddyActions.Actions.DELETE_BUDDY, payload: payload.buddy })
          })
          .subscribe(action => this.store.dispatch(action));
    }
}
