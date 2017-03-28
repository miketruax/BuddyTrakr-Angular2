

// # Buddies Component

import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from "@ngrx/store";
import {State} from '../reducers';
import * as selectedBuddyActions from '../actions/selectedBuddy.actions';
import {Buddy} from '../stores/buddy.store';
import {BuddyService} from '../services/buddy.service';
import {User} from "../stores/user.store";
import * as flashActions from "../actions/flash.actions";

@Component({
  selector: 'buddies',
  providers: [BuddyService],
  styleUrls: ['../styles/app.style.scss'],
  template: require('./buddies.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BuddiesComponent {

  details: boolean;
  buddies: Observable<Array<Buddy>>;
  user: Observable<User>;
  selectedBuddy: Observable<Buddy>;

  constructor(private buddyService: BuddyService,
              private store: Store<State>) {
    buddyService.loadBuddies();
    this.details = false;
    this.buddies = store.select('buddies');
    this.user = store.select('user');
    this.selectedBuddy = store.select('selectedBuddy');
  }

  selectBuddy(buddy: Buddy) {
    this.store.dispatch({
      type: selectedBuddyActions.Actions.SELECT_BUDDY,
      payload: buddy
    });
    this.details = true;
  }

  checkBuddy(buddy: Buddy){
    let msg = buddy.name + " successfully checked " + buddy.checkedOut ? 'in.' : 'out';
    buddy.checkedOut = !buddy.checkedOut;
    this.buddyService.saveBuddy(buddy);
    this.store.dispatch({type: flashActions.Actions.ADD_SUCCESS, payload: msg});
    this.resetBuddy();
  }

  randomBuddy(buddies: Buddy[]){
    //List of all buddies who are currently in
    let inBuddies = buddies.filter(buddy => (!buddy.checkedOut && buddy.timesOut === 0));
    //list of all buddies who have never been out AND are currently in
    let inNeverOutBuddies = inBuddies.filter(buddy=> buddy.timesOut === 0);
    //selects randomly from inNeverOut unless no buddies exist then selects from inBuddies
    let randomBuddyArray = inNeverOutBuddies.length >0 ? inNeverOutBuddies : inBuddies;
    let buddy = randomBuddyArray[Math.floor(Math.random() * randomBuddyArray.length)];
    //TODO: ADD checkBuddy(buddy) line after testing complete
  }

  addBuddy(){
    console.log('addbuddy');
    this.details = true;
  }

  deleteBuddy(buddy: Buddy) {
    console.log("Fake Deletion");
    //this.buddyService.deleteBuddy(buddy);
  }

  resetBuddy() {
    this.store.dispatch({
      type: selectedBuddyActions.Actions.CLEAR_BUDDY
    });
    this.details = false;
  }

  saveBuddy(buddy: Buddy) {
    this.buddyService.saveBuddy(buddy);
    this.store.dispatch({type: flashActions.Actions.ADD_SUCCESS, payload: buddy.name + " successfully saved!"});
    this.resetBuddy();
  }
  ngOnInit(){
      this.details = false;
      this.resetBuddy()
  }
}




