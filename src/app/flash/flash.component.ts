import {Component} from "@angular/core";
import {Flash} from "../stores/flash.store";
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers'
import * as FlashActions from '../actions/flash.actions';
import {Observable} from "rxjs";
@Component({
  selector: 'flash-component',
  templateUrl: require('./flash.component.html'),
  styleUrls: ['flash.component.css']
})

export class FlashComponent {

  flash: Observable<Flash>;

  constructor(private store:Store<fromRoot.State>){
    this.flash = store.select(fromRoot.getFlashState);
  }

  clearError(){
    this.store.dispatch({type: FlashActions.Actions.CLEAR_ERROR})
  }

  clearSuccess(){
    this.store.dispatch({type: FlashActions.Actions.CLEAR_SUCCESS})
  }
}
