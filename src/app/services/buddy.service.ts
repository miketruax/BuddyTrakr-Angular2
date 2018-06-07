// # Buddy Service
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as buddyActions from '../actions/buddies.actions';
import * as flashActions from '../actions/flash.actions';
import {Buddy} from '../stores/buddy.store';
import * as fromRoot from '../reducers';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class BuddyService {
  buddies: Observable<Array<Buddy>>;
  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {
    this.buddies = store.select(fromRoot.getBuddies);
  }

  loadBuddies() {
    let headers = new HttpHeaders()
      .append('Authorization', `JWT ${localStorage.getItem('authToken')}`);
        this.http.get('/api/buddy', {headers: headers})
            .map(payload => {
              if(payload['err']){
                return ({type: flashActions.ADD_FLASH, payload: {type: 'error', message: payload['err']}})
              }
              return ({ type: buddyActions.ADD_BUDDIES, payload: payload['buddy'] })
            })
            .subscribe(action => this.store.dispatch(action));
    }

    saveBuddy(buddy: Buddy, bool: boolean = false) {
      this.store.dispatch({type: flashActions.CLEAR_FLASH});
        (buddy._id) ? this.updateBuddy(buddy, bool) : this.createBuddy(buddy);
    }

    createBuddy(buddy: Buddy) {
      let headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', `JWT ${localStorage.getItem('authToken')}`);
        this.http.post('/api/buddy', JSON.stringify(buddy), {headers: headers})
          .map(payload => {
            if(payload['err']){
              return ({type: flashActions.ADD_FLASH, payload: {type: 'error', message: payload['err']}})
            }
            this.store.dispatch({type: flashActions.ADD_FLASH, payload: {type: 'success', message:`${payload['buddy'].name} successfully saved!`}});
            return ({ type: buddyActions.CREATE_BUDDY, payload: payload['buddy'] })
          })
            .subscribe(action => this.store.dispatch(action));
    }

    updateBuddy(buddy: Buddy, bool: boolean = false) {
      let msg: string;
      if(bool){
        msg = `${buddy.name} successfully checked ${buddy.checkedOut ? 'out' : 'in'}.`;
      }
      else{
        msg = `${buddy.name} successfully updated!`;
      }

      let headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', `JWT ${localStorage.getItem('authToken')}`);
        this.http.put(`/api/buddy/${buddy._id}`, JSON.stringify(buddy), {headers: headers})
          .map(payload => {
            if(payload['err']){
              return ({type: flashActions.ADD_FLASH, payload: {type: 'error', message: payload['err']}})
            }

            this.store.dispatch({
              type: flashActions.ADD_FLASH,
              payload: {type: 'success', message: msg}});
            return ({ type: buddyActions.UPDATE_BUDDY, payload: payload['buddy'] })
          })
          .subscribe(action => {
            this.store.dispatch(action);
            this.loadBuddies();
          });
    }

    deleteBuddy(buddy: Buddy) {
      this.store.dispatch({type: flashActions.CLEAR_FLASH});
      let headers = new HttpHeaders()
      .append('Authorization', `JWT ${localStorage.getItem('authToken')}`);
        this.http.delete(`/api/buddy/${buddy._id}`, {headers: headers})
          .map(payload => {
            if(payload['err']){
              return ({type: flashActions.ADD_FLASH, payload: {type: 'error', message: payload['err']}})
            }
            this.store.dispatch({
              type: flashActions.ADD_FLASH,
              payload: {type: 'sucess', message: `${payload['buddy'].name} successfully deleted!`}});
            return ({ type: buddyActions.DELETE_BUDDY, payload: payload['buddy'] })
          })
          .subscribe(action => this.store.dispatch(action));
    }
}
