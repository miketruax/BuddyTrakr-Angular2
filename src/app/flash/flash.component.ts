//# Flash Component

import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {Flash} from "../stores/flash.store";
import * as fromRoot from '../reducers'
import * as flashActions from '../actions/flash.actions';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";

@Component({
  selector: 'flash-component',
  templateUrl: './flash.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FlashComponent {
  @Input() flash: Flash;
  constructor(private store:Store<fromRoot.State>){
  }
  removeFlash(){
    this.store.dispatch({type: flashActions.CLEAR_FLASH});
  }
}
