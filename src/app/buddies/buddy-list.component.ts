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
  filter: string;
  constructor(){
    this.filter ='';
    console.log(this.filter);
  }
  clearFilter(){
    this.filter = '';
  }
  // Event outputs for buddy interactions.
  @Output() selected = new EventEmitter();
  @Output() checker = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() randomBuddy = new EventEmitter();
  @Output() addBuddy = new EventEmitter();
}
