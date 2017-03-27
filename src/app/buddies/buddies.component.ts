

// # Buddies Component

import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from "@ngrx/store";
import {State} from '../reducers';
import * as selectedBuddyActions from '../actions/selectedBuddy.actions';
import {Buddy} from '../stores/buddy.store';
import {BuddyService} from '../services/buddy.service';
import {User} from "../stores/user.store";

@Component({
  selector: 'buddies',
  providers: [BuddyService],
  styleUrls: ['../styles/app.style.scss'],
  template: require('./buddies.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BuddiesComponent {

  buddies: Observable<Array<Buddy>>;
  user: Observable<User>;
  selectedBuddy: Observable<Buddy>;

  constructor(private buddyService: BuddyService,
              private store: Store<State>) {
    buddyService.loadBuddies();
    this.buddies = store.select('buddies');
    this.user = store.select('user');
    this.selectedBuddy = store.select('selectedBuddy');
  }

  selectBuddy(buddy: Buddy) {
    this.store.dispatch({
      type: selectedBuddyActions.Actions.SELECT_BUDDY,
      payload: buddy
    });
  }

  checkBuddy(buddy: Buddy){
    buddy.checkedOut = !buddy.checkedOut;
    this.buddyService.saveBuddy(buddy);
    this.resetBuddy();
  }

  randomBuddy(buddies: Buddy[]){
    let inBuddies = buddies.filter(buddy => !buddy.checkedOut);
    let buddy = buddies[Math.floor(Math.random() * buddies.length)];
    //TODO: ADD checkBuddy(buddy) line after testing complete
  }

  addBuddy(b: boolean){
    console.log(b);
  }

  static deleteBuddy(buddy: Buddy) {
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


