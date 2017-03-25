import {Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {Buddy} from '../stores/buddy.store';


@Component({
  selector: 'buddy-detail',
  template: require('./buddy-details.component.html')
})
export class BuddyDetailsComponent {

  originalName: string;
  selectedBuddy: Buddy;


  @Input('selectedBuddy') set _buddy(value: Buddy) {
    if (value) this.originalName = value.name;
    this.selectedBuddy = Object.assign({}, value);
  }

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  constructor() {

  }


}
