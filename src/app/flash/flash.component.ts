//# Flash Component
import {Component, ChangeDetectionStrategy} from "@angular/core";
import { Observable } from "rxjs";
import { RootStoreFacade } from "../store";
import { Flash } from "../models/flash.model";

@Component({
  selector: 'flash-component',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class FlashComponent{
  flash: Observable<Flash>;
  constructor(private rootStore: RootStoreFacade){
    this.flash = this.rootStore.flash$;
  }
  removeFlash(){
    this.rootStore.clearFlash();
  }
}
