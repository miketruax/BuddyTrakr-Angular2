import {Component, ElementRef, ViewChild} from '@angular/core';
import {UserService} from './services/user.service'
import {Observable} from "rxjs";

import {Router, NavigationStart, RouterOutlet} from "@angular/router";
import {slideInAnimation } from './shared/animations/routeAnimations';
import { RootStoreFacade } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  @ViewChild('menu') menu:ElementRef;
  userID: Observable<String>;
  constructor(private router: Router, private userService: UserService, private rootStore: RootStoreFacade){
    this.router.events.subscribe(path => {
      if(event instanceof NavigationStart && path['url'] != this.router.url) {
        window.scrollTo(0,0);
        this.rootStore.clearFlash()
      }
    });
  }
  get loggedIn(){
    return this.userService.isLoggedIn;
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  
  logout(){
    this.userService.logout();
  }
  ngOnInit(){
  }
}
