import {Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {Buddy} from '../../models/buddy.model';


@Component({
  selector: 'buddy-card',
  templateUrl: "./buddy-card.component.html",
  styleUrls: ["./buddy-card.component.scss"]
})
export class BuddyCardComponent {

  originalName: string;
  selectedBuddy: Buddy;
  dateAdded: string;


  @Input('buddy') buddy: Buddy;
  @Output('check') checkBuddyEvent = new EventEmitter<Buddy>();
  @Output('select') selectBuddyEvent = new EventEmitter<Buddy>();


  constructor() {  }

  checkBuddy(){
    this.checkBuddyEvent.emit(this.buddy)
  }

  selectBuddy(){
    this.selectBuddyEvent.emit(this.buddy)
  }


}
