// # Buddy Service
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { flashActions, buddyActions } from "../../actions";
import { Buddy } from "../stores/buddy.store";
import * as fromRoot from "../../reducers";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class BuddyService {
  buddies: Observable<Array<Buddy>>;
  lastUpdated: number = 0;
  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {

    this.buddies = store.select(fromRoot.getBuddies);
  }

  // Pulls all buddies based off current JWT token in localStorage
  // Updates the store and saves locally if data hasn't changed in 60 seconds
  loadBuddies() {
    console.log(Date.now() - this.lastUpdated);
    if(!(Date.now() - this.lastUpdated > 60000)){
      return;
    }
    
    //Adds JWT to header
    let headers = new HttpHeaders().append("Authorization", `JWT ${localStorage.getItem("authToken")}`);
    this.http.get("/api/buddy", { headers: headers })
      .pipe(
        map(payload =>  ({ type: buddyActions.ADD_BUDDIES, payload: payload["buddy"]})), 
        catchError(err => of({ type: flashActions.ADD_ERROR, payload: "Could not access, please check credentials and try again." })))
      .subscribe(action => {
        this.lastUpdated = Date.now()
        this.store.dispatch(action)
      });
  }

  saveBuddy(buddy: Buddy) {
    this.store.dispatch({ type: flashActions.CLEAR_FLASH });
    buddy._id ? this.updateBuddy(buddy) : this.createBuddy(buddy);
  }

  createBuddy(buddy: Buddy) {
    let headers = new HttpHeaders()
      .append("Content-Type", "application/json")
      .append("Authorization", `JWT ${localStorage.getItem("authToken")}`);
    this.http
      .post("/api/buddy", JSON.stringify(buddy), { headers: headers })
      .pipe(
        map(payload => {
          this.store.dispatch({
            type: flashActions.ADD_SUCCESS,
            payload: `${payload["buddy"].name} successfully saved!`
          });
          return { type: buddyActions.CREATE_BUDDY, payload: payload["buddy"] };
        }), 
        catchError(err => of({ type: flashActions.ADD_ERROR, payload: "Could not access, please check credentials and try again." }))
      )
      .subscribe(action => this.store.dispatch(action));
  }

  checkBuddy(buddy){
    let msg: string =  `${buddy.name} successfully checked ${buddy.checkedOut ? "out" : "in"}.`
    this.updateBuddy(buddy, msg)
  }

  updateBuddy(buddy: Buddy, msg: string = `${buddy.name} successfully updated!`) {
    let headers = new HttpHeaders()
      .append("Content-Type", "application/json")
      .append("Authorization", `JWT ${localStorage.getItem("authToken")}`);
    this.http
      .put(`/api/buddy/${buddy._id}`, JSON.stringify(buddy), {
        headers: headers
      })
      .pipe(
        map(payload => {
          this.store.dispatch({
            type: flashActions.ADD_SUCCESS,
            payload: msg
          });
          return { type: buddyActions.UPDATE_BUDDY, payload: payload["buddy"] };
        }),
        catchError(err => of({ type: flashActions.ADD_ERROR, payload: "Could not access, please check credentials and try again." }))
      )
      .subscribe(action => {
        this.store.dispatch(action);
      });
  }

  deleteBuddy(buddy: Buddy) {
    this.store.dispatch({ type: flashActions.CLEAR_FLASH });
    let headers = new HttpHeaders().append(
      "Authorization",
      `JWT ${localStorage.getItem("authToken")}`
    );
    this.http
      .delete(`/api/buddy/${buddy._id}`, { headers: headers })
      .pipe(
        map(payload => {
          this.store.dispatch({
            type: flashActions.ADD_SUCCESS,
            payload: `${payload["buddy"].name} successfully deleted!`
          });
          return { type: buddyActions.DELETE_BUDDY, payload: payload["buddy"] };
        }),
        catchError(err => of({ type: flashActions.ADD_ERROR, payload: "Could not access, please check credentials and try again." }))
      )
      .subscribe(action => this.store.dispatch(action));
  }
}
