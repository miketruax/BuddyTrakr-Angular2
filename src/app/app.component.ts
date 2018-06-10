import {Component, ChangeDetectionStrategy, ElementRef, ViewChild} from '@angular/core';
import {UserService} from './services/user.service'
import * as fromRoot from "./reducers/index";
import * as flashActions from './actions/flash.actions'
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Router, NavigationStart} from "@angular/router";
import {Flash} from "./stores/flash.store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./styles/app.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChild('menu') menu:ElementRef;
  userID: Observable<String>;
  flash: Observable<Flash>;
  menuActive: boolean = false;
  constructor(private router: Router, private userService: UserService, private store: Store<fromRoot.State>){
    this.userID = store.select(fromRoot.getUserId);
    this.flash = store.select(fromRoot.getFlash);
    this.router.events.subscribe(path => {
      if (path['url'] != this.router.url) {
        this.menuActive = false;
        this.menu.nativeElement.setAttribute('aria-expanded', false);
        this.menu.nativeElement.classList.remove('show');
        window.scrollTo(0, 0);
      }
      if(event instanceof NavigationStart) {
        store.dispatch({type: flashActions.CLEAR_FLASH});
      }
    });
  }
  menuClick(){
    this.menuActive = !this.menuActive;
  }
  logout(){
    this.userService.logout();
  }
  ngOnInit(){
  }
}
