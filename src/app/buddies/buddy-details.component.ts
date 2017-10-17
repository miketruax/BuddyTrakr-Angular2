import {Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {Buddy} from '../stores/buddy.store';


@Component({
  selector: 'buddy-detail',
  templateUrl: "./buddy-details.component.html"
})
export class BuddyDetailsComponent {

  originalName: string;
  selectedBuddy: Buddy;
  dateAdded: string;


  @Input('selectedBuddy') set _buddy(value: Buddy) {
    if (value) this.originalName = value.name;
    this.selectedBuddy = Object.assign({}, value);
  }

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  constructor() {

  }

  saveBuddy(){
    if(!this.selectedBuddy.dateAdded){
      this.selectedBuddy.dateAdded = new Date(this.dateAdded);
    }
    this.saved.emit(this.selectedBuddy);
  }

}
