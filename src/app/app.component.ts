import {Component, state} from '@angular/core';
import {UserService} from './services/user.service'
import * as fromRoot from "./reducers/index";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {User} from "./stores/user.store";
import {Router} from "@angular/router";

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
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(){
    console.log(this.user);
  }
}


