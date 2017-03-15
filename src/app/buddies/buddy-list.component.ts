// # Buddy List

import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from '@angular/core';

import {Buddy} from '../stores/buddy.store';


@Component({
  selector: 'buddy-list',
  template: './buddy-list.html'
})

export class BuddyListComponent {
  @Input() buddies: Buddy[];

  // Event outputs for buddy interactions.
  @Output() selected = new EventEmitter();
  @Output() checker = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
