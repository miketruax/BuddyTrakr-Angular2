// # Buddy List

import {
  Component,
  Input,
  Output,
  EventEmitter, SimpleChanges
} from '@angular/core';

import {Buddy} from '../../stores/buddy.store';
import {User} from "../../../stores/user.store";


@Component({
  selector: 'buddy-list',
  templateUrl: "./buddy-list.component.html",
  styleUrls: ['./buddy-list.component.scss']
})

export class BuddyListComponent{
  @Input() buddies: Buddy[];
  @Input() user: User;
  activePage: number = 1;
  perPage: number = 12;
  public filter: any = {search: '', neverOut: false};
  constructor(){
  }
  clearFilter(){
    this.filter = {search: '', neverOut: false};
    this.resetPage();
  }

  setActive(active: number){
    this.activePage = active;
  }
  resetPage(){
    this.activePage = 1
  }

  buttons(num){
    if(num) {
      let numButtons = Math.ceil(num / this.perPage);
      return Array.from(Array(numButtons), (x, i) => i + 1);
    }

  }

  getActivePortion(arr: Buddy[]){
    return arr.slice(((this.activePage-1)*this.perPage), ((this.activePage)*this.perPage));
  }
  setPerPage(num){
    this.perPage = num;
    this.setActive(1);
  }

  // Event outputs for buddy interactions.
  @Output() selected = new EventEmitter();
  @Output() checker = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() randomBuddy = new EventEmitter();
  @Output() addBuddy = new EventEmitter();
}
