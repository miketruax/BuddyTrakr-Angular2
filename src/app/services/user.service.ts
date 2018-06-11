import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as fromRoot from '../reducers';
import {User} from "../stores/user.store"
import {Router} from "@angular/router";
import {flashActions, userActions, buddyActions} from '../actions';
import {Store} from "@ngrx/store";
import {InitUserService} from "./init-user.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable()

export class UserService {
  private user: Observable<User>;
  public isLoggedIn: boolean;

  constructor(private initUser: InitUserService, private router: Router, private http: HttpClient, private store: Store<fromRoot.State>) {
    this.isLoggedIn = initUser.getIsLoggedIn();
    this.store.dispatch({type: userActions.SELECT_USER, payload: initUser.getUser()});
    this.user = store.select(fromRoot.getUserState);
  }


  login(username, password) {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    this.http.post('/api/auth/login', JSON.stringify({ username, password }), {headers: headers} )
      .map(res =>{
        this.store.dispatch({type: flashActions.CLEAR_FLASH});
        return res;
      })
      .map(payload => {
        if(payload['err']){
          return {type: flashActions.ADD_ERROR, payload: payload['err']};
        }
        else {
          localStorage.setItem('authToken', payload['token']);
          this.isLoggedIn = true;
          this.router.navigate(['/buddies']);
          return {type: userActions.SELECT_USER, payload: payload['user']}
        }
      })
      .subscribe(action => this.store.dispatch(action))
  }


  signup(username, password, email){
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    this.http.post('/api/auth/signup', JSON.stringify({username, password, email}), {headers: headers})
      .map(res=>{
        this.store.dispatch({type: flashActions.CLEAR_FLASH});
        return res;
      })
      .map(payload => {
        if(payload['err']){
          return {type: flashActions.ADD_ERROR, payload: payload['err']};
        }
        else{
          this.router.navigate(['/login']);
          return {type: flashActions.ADD_SUCCESS, payload: 'Successfully signed up, please log in!'};
        }
      })
      .subscribe(action=> this.store.dispatch(action));
  }

  changePassword(currentPassword, newPassword){
    let headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization', `JWT ${localStorage.getItem('authToken')}`);
    this.http.post('/api/auth/changeSettings', JSON.stringify({currentPassword, newPassword}), {headers: headers})
      .map(res=>{
        this.store.dispatch({type: flashActions.CLEAR_FLASH});
        return res
      })
      .map(payload=> {
        if(payload['err']){
          return {type: flashActions.ADD_ERROR, payload:payload['err']};
        }
        else{
          this.router.navigate(['/buddies']);
          localStorage.setItem('authToken', payload['token']);
          return {type: flashActions.ADD_SUCCESS, payload: 'Successfully updated password.'}
        }
      })
      .subscribe(action=> this.store.dispatch(action));
  }

  logout() {
    this.isLoggedIn = false;
    this.store.dispatch({ type: buddyActions.ADD_BUDDIES, payload: []});
    this.store.dispatch({type: userActions.CLEAR_USER});
    this.store.dispatch({type: flashActions.ADD_SUCCESS, payload:'Successfully Logged Out'});
    this.router.navigate(['/login']);
    localStorage.removeItem('authToken');
  }
}
