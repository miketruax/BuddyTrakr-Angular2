

// # Buddies Component

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import * as selectedBuddyActions from '../actions/selectedBuddy.actions'

import {Buddy} from '../stores/buddy.store';
import {BuddyService} from '../services/buddy.service';
import {BuddyDetails} from './buddy-details.component';
import {BuddyList} from './buddy-list.component';

@Component({
  selector: 'buddies',
  providers: [],
  template: require('./buddies.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Buddies {

  buddies: Observable<Array<Buddy>>;

  selectedBuddy: Observable<Buddy>;

  constructor(private buddyService: BuddyService,
              private store: Store<State>) {

    this.buddies = buddyService.buddies;

    this.selectedBuddy = store.select('buddy');

    buddyService.loadBuddies();
  }

  selectBuddy(buddy: Buddy) {
    this.store.dispatch({
      type: selectedBuddyActions.Actions.SELECT_BUDDY,
      payload: buddy
    });
  }

  checkBuddy(buddy: Buddy){
    console.log(buddy);
    buddy.checkedOut = !buddy.checkedOut;
    console.log('Buddy:', buddy);
    console.log('Checked:', buddy.checkedOut);
    this.buddyService.saveBuddy(buddy);
    this.resetBuddy();
  }


  deleteBuddy(buddy: Buddy) {
    console.log("Fake Deletion");
    //this.buddyService.deleteBuddy(buddy);
  }

  resetBuddy() {
    this.store.dispatch({
      type: selectedBuddyActions.Actions.CLEAR_BUDDY
    });
  }

  saveBuddy(buddy: Buddy) {
    this.buddyService.saveBuddy(buddy);
    this.resetBuddy();
  }
}
