// # Buddy Service

import {Http, Headers} from '@angular/http';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as buddyActions from '../actions/buddies.actions'
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
        this.http.get('/api/buddy')
            .map(res => res.json())
            .map(payload => ({ type: buddyActions.Actions.ADD_BUDDIES, payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    saveBuddy(buddy: Buddy, bool: boolean = false) {

        (buddy._id) ? this.updateBuddy(buddy, bool) : this.createBuddy(buddy);
    }

    createBuddy(buddy: Buddy) {

        this.http.post('http://buddytrakr.herokuapp.com/api/buddy', JSON.stringify(buddy), HEADER)
            .map(res => res.json())
            .map(payload => ({ type: buddyActions.Actions.CREATE_BUDDY, payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    updateBuddy(buddy: Buddy, bool: boolean = false) {

        this.http.put(`http://buddytrakr.herokuapp.com/api/buddy/${buddy._id}`, JSON.stringify(buddy), HEADER)
          .subscribe(action => {
            this.store.dispatch({ type: buddyActions.Actions.UPDATE_BUDDY, payload: buddy })
            this.loadBuddies();
          });
    }

    deleteBuddy(buddy: Buddy) {

        this.http.delete(`http://buddytrakr.herokuapp.com/api/buddy/${buddy._id}`)
          .subscribe(action => this.store.dispatch({ type: buddyActions.Actions.DELETE_BUDDY, payload: buddy }));
    }
}
