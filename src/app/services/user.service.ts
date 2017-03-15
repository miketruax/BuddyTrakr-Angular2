// user.service.ts
import {Http, Headers} from '@angular/http';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import {User} from "../stores/user.store"
import {Router} from "@angular/router";

@Injectable()
export class UserService {
  private user: Observable<User>;

  constructor(private router: Router, private http: Http, private store: Store<fromRoot.State>) {
    this.user = store.select('user');
  }


  login(username, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http
      .post(
        '/api/auth/login',
        JSON.stringify({ username, password }),
        { headers }
      )
      .map(res => res.json())
      .map(payload => ({ type: 'SELECT_USER', payload }))
      .subscribe(action => this.store.dispatch(action))
  }
  public getUser(){
    this.http.get('/api/auth/loggedIn')
      .map(res => res.json())
      .map(payload => ({ type: 'UPDATE_USER', payload }))
      .subscribe(action => this.store.dispatch(action));

  }

  logout() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http
      .post('/api/auth/logout', '', { headers });
    this.getUser();
    this.router.navigate(['Login']);
  }


}
