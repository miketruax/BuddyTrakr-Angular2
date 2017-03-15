// # Buddy Service

import {Http, Headers} from '@angular/http';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

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
            .map(payload => ({ type: 'ADD_BUDDIES', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    saveBuddy(buddy: Buddy) {

        (buddy._id) ? this.updateBuddy(buddy) : this.createBuddy(buddy);
    }

    createBuddy(buddy: Buddy) {

        this.http.post('/api/buddy', JSON.stringify(buddy), HEADER)
            .map(res => res.json())
            .map(payload => ({ type: 'CREATE_BUDDY', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    updateBuddy(buddy: Buddy) {

        this.http.put(`/api/buddy/${buddy._id}`, JSON.stringify(buddy), HEADER)
          .subscribe(action => this.store.dispatch({ type: 'UPDATE_BUDDY', payload: buddy }));
    }

    deleteBuddy(buddy: Buddy) {

        this.http.delete(`/api/buddy/${buddy._id}`)
          .subscribe(action => this.store.dispatch({ type: 'DELETE_RECIPE', payload: buddy }));
    }
}
