import {Component, state} from '@angular/core';
import {UserService} from './services/user.service'
import * as fromRoot from "./reducers/index";
import * as FlashActions from './actions/flash.actions'
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {User} from "./stores/user.store";
import {Router, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  private user: Observable<User>;
  constructor(private userService: UserService, private store: Store<fromRoot.State>, private router: Router){
    this.user = store.select(fromRoot.getUser);
    this.userService.getUser();
    this.router.events.subscribe((val) => {
      store.dispatch({type: FlashActions.Actions.CLEAR_FLASH});
    });
  }
  logout(){
    this.userService.logout();
  }

  ngOnInit(){
  }
}


