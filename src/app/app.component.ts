import {Component, ElementRef, ViewChild} from '@angular/core';
import {UserService} from './services/user.service'
import {Observable} from "rxjs";

import {Router, NavigationStart, RouterOutlet} from "@angular/router";
import {slideInAnimation } from './shared/animations/route-animations';
import { RootStoreFacade } from './store';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  @ViewChild('menu') menu:ElementRef;
  user: Observable<User>;
  opened: boolean;
  constructor(private router: Router, private userService: UserService, private rootStore: RootStoreFacade){
    this.user = this.rootStore.user$;
    this.router.events.subscribe(path => {
      if(event instanceof NavigationStart && path['url'] != this.router.url) {
        window.scrollTo(0,0);
        this.rootStore.clearFlash()
      }
    });
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
