import { Injectable} from "@angular/core";
import { of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import * as fromRoot from "../reducers";

import { Router } from "@angular/router";
import { flashActions, userActions, buddyActions } from "../actions";
import { Store } from "@ngrx/store";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../stores/user.store";

@Injectable()
export class UserService{
  public isLoggedIn: boolean = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private store: Store<fromRoot.State>
  ) {
    if(localStorage.getItem('user')){
      this.isLoggedIn = true;
    }
  }

  //Unneeded I know but helps clean up a lot of the fluff.
  dispatch(type: any, payload?: any) {
    this.store.dispatch({ type: type, payload: payload });
  }

  get user(): User{
      return this.isLoggedIn ? JSON.parse(localStorage.getItem('user')) : null
  }

  login(username, password) {
    let headers = new HttpHeaders().append("Content-Type", "application/json");
    this.dispatch(flashActions.CLEAR_FLASH);
    this.http
      .post("/api/auth/login", JSON.stringify({ username, password }), {
        headers: headers
      })
      .pipe(
        map(payload => {
          if (payload["err"]) {
            return { type: flashActions.ADD_ERROR, payload: payload["err"] };
          } else {
            localStorage.setItem("authToken", payload["token"]);
            localStorage.setItem("user", JSON.stringify(payload['user']));
            this.isLoggedIn = true;
            this.router.navigate(["/buddies"]);
            return { type: userActions.SELECT_USER, payload: payload["user"] };
          }
        }),
        catchError(error =>
          of({
            type: flashActions.ADD_ERROR,
            payload: "Something went wrong, please try again later"
          })
        )
      )
      .subscribe(action => this.store.dispatch(action));
  }

  signup(username, password, email) {
    this.store.dispatch({ type: flashActions.CLEAR_FLASH });
    let headers = new HttpHeaders().append("Content-Type", "application/json");
    this.http
      .post("/api/auth/signup", JSON.stringify({ username, password, email }), {
        headers: headers
      })
      .pipe(
        map(payload => {
          if (payload["err"]) {
            return { type: flashActions.ADD_ERROR, payload: payload["err"] };
          } else {
            this.router.navigate(["/login"]);
            return {
              type: flashActions.ADD_SUCCESS,
              payload: "Successfully signed up, please log in!"
            };
          }
        })
      )
      .subscribe(action => this.store.dispatch(action));
  }

  changePassword(currentPassword, newPassword) {
    this.store.dispatch({ type: flashActions.CLEAR_FLASH });
    let headers = new HttpHeaders()
      .append("Content-Type", "application/json")
      .append("Authorization", `JWT ${localStorage.getItem("authToken")}`);
    this.http
      .post(
        "/api/auth/changeSettings",
        JSON.stringify({ currentPassword, newPassword }),
        { headers: headers }
      )
      .pipe(
        map(payload => {
          if (payload["err"]) {
            return { type: flashActions.ADD_ERROR, payload: payload["err"] };
          } else {
            this.router.navigate(["/buddies"]);
            localStorage.setItem("authToken", payload["token"]);
            return {
              type: flashActions.ADD_SUCCESS,
              payload: "Successfully updated password."
            };
          }
        })
      )
      .subscribe(action => this.store.dispatch(action));
  }

  logout() {
    this.dispatch(buddyActions.ADD_BUDDIES, []);
    this.dispatch(userActions.CLEAR_USER);
    this.dispatch(flashActions.ADD_SUCCESS, "Successfully Logged Out");
    this.router.navigate(["/login"]);
    this.isLoggedIn = false;
    localStorage.clear();
  }
}
