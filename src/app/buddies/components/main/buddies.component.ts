// # Buddies Component
import {Component, ChangeDetectionStrategy} from '@angular/core';
import * as fromRoot from '../../../reducers'
import * as selectedBuddyActions from '../../actions/selectedBuddy.actions';
import {Buddy} from '../../stores/buddy.store';
import {BuddyService} from '../../services/buddy.service';
import {User} from "../../../stores/user.store";
import * as flashActions from "../../../actions/flash.actions";
import {Store} from "@ngrx/store";
import {Observable} from 'rxjs';

@Component({
  selector: 'buddies',
  templateUrl: "./buddies.component.html",
  styleUrls: ['buddies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BuddiesComponent {

  details: boolean;
  buddies: Observable<Array<Buddy>>;
  user: Observable<User>;
  selectedBuddy: Observable<Buddy>;
  actionType: string;

  constructor(private buddyService: BuddyService,
              private store: Store<fromRoot.State>) {
    buddyService.loadBuddies();
    this.details = false;
    this.buddies = store.select(fromRoot.getBuddies);
    this.user = store.select(fromRoot.getUser);
    this.selectedBuddy = store.select(fromRoot.getSelectedBuddiesState);
  }

  selectBuddy(buddy: Buddy) {
    this.store.dispatch({
      type: selectedBuddyActions.SELECT_BUDDY,
      payload: buddy
    });
    this.toggleDetails(true, 'edit')
  }

  checkBuddy(buddy: Buddy){
    buddy.checkedOut = !buddy.checkedOut;
    this.buddyService.saveBuddy(buddy, true);
    this.resetBuddy();
  }

  randomBuddy(buddies: Buddy[]){
    //List of all buddies who are currently in
    let inBuddies = buddies.filter(buddy => (!buddy.checkedOut));
    //list of all buddies who have never been out AND are currently in
    let inNeverOutBuddies = inBuddies.filter(buddy=> buddy.timesOut === 0 || !buddy.timesOut);
    //selects randomly from inNeverOut unless no buddies exist then selects from inBuddies
    let randomBuddyArray = inNeverOutBuddies.length > 0 ? inNeverOutBuddies : inBuddies;
    let buddy = randomBuddyArray[Math.floor(Math.random() * randomBuddyArray.length)];
    this.checkBuddy(buddy);
  }

  addBuddy(buddy: Buddy){
    this.toggleDetails(true, 'add')
  }

  deleteBuddy(buddy: Buddy) {
    console.log("Fake Deletion");
    //this.buddyService.deleteBuddy(buddy);
  }

  resetBuddy() {
    this.store.dispatch({
      type: selectedBuddyActions.CLEAR_BUDDY
    });
    this.toggleDetails(false)
  }

  saveBuddy(buddy: Buddy) {
    console.log(buddy);
    this.buddyService.saveBuddy(buddy);
    this.resetBuddy();
  }

  toggleDetails(showDetails: boolean, actionType: string = null){
    this.details = showDetails;
    this.actionType = actionType;
    this.store.dispatch({type: flashActions.CLEAR_FLASH})
  }


  ngOnInit(){
      this.details = false;
      this.resetBuddy()
  }
}




