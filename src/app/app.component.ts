import {Component, state, ChangeDetectionStrategy} from '@angular/core';
import {UserService} from './services/user.service'
import * as fromRoot from "./reducers/index";
import * as flashActions from './actions/flash.actions'
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {User} from "./stores/user.store";
import {Router, NavigationEnd, NavigationStart} from "@angular/router";
import {Flash} from "./stores/flash.store";
import {BuddyService} from "./services/buddy.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./styles/app.style.scss'],
  providers: [BuddyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private userID: Observable<String>;
  private flash: Observable<Flash>;
  constructor(private userService: UserService, private store: Store<fromRoot.State>, private router: Router){
    this.userID = store.select(fromRoot.getUserId);
    this.flash = store.select(fromRoot.getFlash);
    this.userService.getUser();
    this.router.events.subscribe((val) => {
      if(event instanceof NavigationStart) {
        store.dispatch({type: flashActions.Actions.CLEAR_FLASH});
      }
    });
  }
  logout(){
    this.userService.logout();
  }
  ngOnInit(){
  }
}


