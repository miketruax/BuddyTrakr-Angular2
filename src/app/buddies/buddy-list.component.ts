// # Buddy List

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from '@angular/core';

import {Buddy} from '../stores/buddy.store';
import {User} from "../stores/user.store";


@Component({
  selector: 'buddy-list',
  templateUrl: "./buddy-list.component.html"
})

export class BuddyListComponent {
  @Input() buddies: Buddy[];
  @Input() user: User;
  public filter: any = {search: '', neverOut: false};
  constructor(){
  }
  clearFilter(){
    this.filter = {search: '', neverOut: false};
  }

  showFilter(){
    console.log(this.filter);
  }
  // Event outputs for buddy interactions.
  @Output() selected = new EventEmitter();
  @Output() checker = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() randomBuddy = new EventEmitter();
  @Output() addBuddy = new EventEmitter();
}
