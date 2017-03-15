import {Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {BuddyService} from '../services/buddy.service';
import {Buddy} from '../stores/buddy.store';


@Component({
  selector: 'buddy-detail',
  template: require('./buddy-details.html')
})
export class BuddyDetailsComponent {

  originalName: string;
  selectedBuddy: Buddy;


  @Input('buddy') set _buddy(value: Buddy) {
    if (value) this.originalName = value.name;
    this.selectedBuddy = Object.assign({}, value);
  }

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  constructor() {

  }


}
