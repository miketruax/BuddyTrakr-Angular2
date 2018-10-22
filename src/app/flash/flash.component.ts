//# Flash Component

import {Component, ChangeDetectionStrategy, Input} from "@angular/core";
import {Flash} from "../stores/flash.store";
import * as fromRoot from '../reducers'
import * as flashActions from '../actions/flash.actions';
import {Store} from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: 'flash-component',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class FlashComponent {
  flash: Observable<Flash>;
  constructor(private store:Store<fromRoot.State>){
    this.flash = store.select(fromRoot.getFlash);
  }
  removeFlash(){
    this.store.dispatch({type: flashActions.CLEAR_FLASH});
  }
}
