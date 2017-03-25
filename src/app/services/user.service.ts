///<reference path="../../../node_modules/rxjs/add/operator/map.d.ts"/>
// user.service.ts
import {Http, Headers} from '@angular/http';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as fromRoot from '../reducers';
import {User} from "../stores/user.store"
import {Router} from "@angular/router";
import * as userActions from '../actions/user.actions'

@Injectable()
export class UserService {
  private user: Observable<User>;

  constructor(private router: Router, private http: Http, private store: Store<fromRoot.State>) {
    this.user = store.select('user');
  }


  login(username, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('../api/auth/login', JSON.stringify({ username, password }), { headers })
      .map(res => res.json())
      .map(payload => {
        if(payload.err){
          console.log(payload.err);
          return {type: userActions.Actions.CLEAR_USER};
        }
        else {
          this.router.navigate(['/buddies']);
          return {type: userActions.Actions.SELECT_USER, payload}
        }
      })
      .subscribe(action => this.store.dispatch(action))
  }
  public getUser(){
    this.http.get('/api/auth/getUser')
      .map(res => res.json())
      .map(payload => ({type: userActions.Actions.SELECT_USER, payload: payload}))
      .subscribe(action => this.store.dispatch(action));

  }
  public isLoggedIn(): Observable<boolean>{
    return this.http.get('/api/auth/isLoggedIn')
      .map(res => {console.log(res); return res.json()})
  }


  logout() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('/api/auth/logout', '', { headers })
      .subscribe(res => {
        this.store.dispatch({type: userActions.Actions.CLEAR_USER});
        this.router.navigate(['Login']);
      });




  }


}
