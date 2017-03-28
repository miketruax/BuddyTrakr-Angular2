import {Http, Headers} from '@angular/http';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as fromRoot from '../reducers';
import {User} from "../stores/user.store"
import {Router} from "@angular/router";
import * as userActions from '../actions/user.actions';
import * as flashActions from '../actions/flash.actions';

@Injectable()
export class UserService {
  private user: Observable<User>;

  constructor(private router: Router, private http: Http, private store: Store<fromRoot.State>) {
    this.user = store.select(fromRoot.getUserState);
  }


  login(username, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('../api/auth/login', JSON.stringify({ username, password }), { headers })
      .map(res =>{
        this.store.dispatch({type: flashActions.Actions.CLEAR_FLASH});
        return res.json();
      })
      .map(payload => {
        if(payload.err){
          return {type: flashActions.Actions.ADD_ERROR, payload: payload.err};
        }
        else {
          this.router.navigate(['/buddies']);
          return {type: userActions.Actions.SELECT_USER, payload: payload.user}
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
      .map(res => res.json())
  }

  signup(username, password, email){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('../api/auth/signup', JSON.stringify({username, password, email}), {headers})
      .map(res=>{
        this.store.dispatch({type: flashActions.Actions.CLEAR_FLASH});
        return res.json();
      })
      .map(payload => {
        if(payload.err){
          console.log(payload.err);
          return {type: flashActions.Actions.ADD_ERROR, payload: payload.err};
        }
        else{
          this.router.navigate(['/login']);
          return {type: flashActions.Actions.ADD_SUCCESS, payload: 'Successfully signed up, please log in!'};
        }
      })
      .subscribe(action=> this.store.dispatch(action));
  }

  logout() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('/api/auth/logout', '', { headers })
      .subscribe(res => {
        this.store.dispatch({type: userActions.Actions.CLEAR_USER});
        this.router.navigate(['login']);
        this.store.dispatch({type: flashActions.Actions.ADD_SUCCESS, payload: 'Successfully Logged Out'});

      });




  }


}
