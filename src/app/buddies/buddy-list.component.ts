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
  styleUrls: ['../styles/app.style.scss'],
  template: require('./buddy-list.component.html')
})

export class BuddyListComponent {
  @Input() buddies: Buddy[];
  @Input() user: User;
  filter: Object;
  constructor(){
    this.filter = {search: '', neverOut: false};
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
