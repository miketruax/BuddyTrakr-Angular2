import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as fromRoot from '../reducers';
import {User} from "../stores/user.store"
import {Router} from "@angular/router";
import * as userActions from '../actions/user.actions';
import * as flashActions from '../actions/flash.actions';
import * as buddyActions from '../actions/buddies.actions';
import {Store} from "@ngrx/store";

@Injectable()

export class UserService {
  private user: Observable<User>;
  public isLoggedIn: boolean = false;
  constructor(private router: Router, private http: Http, private store: Store<fromRoot.State>) {

    this.user = store.select(fromRoot.getUserState);
  }


  login(username, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('/api/auth/login', JSON.stringify({ username, password }), {headers: headers} )
      .map(res =>{
        this.store.dispatch({type: flashActions.Actions.CLEAR_FLASH});
        return res.json();
      })
      .map(payload => {
        if(payload.err){
          return {type: flashActions.Actions.ADD_ERROR, payload: payload.err};
        }
        else {
          localStorage.setItem('authToken', payload.token);
          this.isLoggedIn = true;
          this.router.navigate(['/buddies']);
          return {type: userActions.Actions.SELECT_USER, payload: payload.user}
        }
      })
      .subscribe(action => this.store.dispatch(action))
  }
  public getUser(){
    let headers = new Headers();
    headers.append('Authorization', localStorage.getItem('authToken'));
    this.http.get('/api/auth/getUser', headers)
      .map((res) =>{
      return res.json()})
      .map(payload => {
        if(payload.user){
          this.isLoggedIn = true;
          this.redirect();
          return {type: userActions.Actions.SELECT_USER, payload: payload.user}
        }
        else{
          this.isLoggedIn = false;
        }
        return {type: userActions.Actions.CLEAR_USER}
    })
      .subscribe(action => this.store.dispatch(action));

  }

  private redirect(){
    if(this.router.url === '/login' || this.router.url === '/signup'){
     this.router.navigate(['/buddies']);
    }
  }


  signup(username, password, email){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('/api/auth/signup', JSON.stringify({username, password, email}))
      .map(res=>{
        this.store.dispatch({type: flashActions.Actions.CLEAR_FLASH});
        return res.json();
      })
      .map(payload => {
        if(payload.err){
          return {type: flashActions.Actions.ADD_ERROR, payload: payload.err};
        }
        else{
          this.router.navigate(['/login']);
          return {type: flashActions.Actions.ADD_SUCCESS, payload: 'Successfully signed up, please log in!'};
        }
      })
      .subscribe(action=> this.store.dispatch(action));
  }

  changePassword(currentPassword, newPassword){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('authToken'));
    this.http.post('/api/auth/changeSettings', JSON.stringify({currentPassword, newPassword}), {headers: headers})
      .map(res=>{
        this.store.dispatch({type: flashActions.Actions.CLEAR_FLASH});
        return res.json();
      })
      .map(payload=> {
        if(payload.err){
          return {type: flashActions.Actions.ADD_ERROR, payload: payload.err};
        }
        else{
          this.router.navigate(['/buddies']);
          return {type: flashActions.Actions.ADD_SUCCESS, payload: 'Successfully updated password.'}
        }
      })
      .subscribe(action=> this.store.dispatch(action));
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('authToken');
    this.store.dispatch({ type: buddyActions.Actions.ADD_BUDDIES, payload: []});
    this.store.dispatch({type: userActions.Actions.CLEAR_USER});
    this.store.dispatch({type: flashActions.Actions.ADD_SUCCESS, payload: 'Successfully Logged Out'});
    this.router.navigate(['login']);
  }
}
