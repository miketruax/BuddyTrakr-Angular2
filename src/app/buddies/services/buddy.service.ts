// # Buddy Service
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Buddy } from "../models/buddy.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BuddyStoreFacade } from "../store";
import {RootStoreFacade} from '../../store';

@Injectable()
export class BuddyService {
  buddies: Observable<Array<Buddy>>;
  lastUpdated: number = 0;
  constructor(private http: HttpClient, private buddyStore: BuddyStoreFacade, private rootStore: RootStoreFacade) {

    this.buddies = buddyStore.buddies$;
  }

  // Pulls all buddies based off current JWT token in localStorage
  // Updates the store and saves locally if data hasn't changed in 60 seconds
  loadBuddies() {
    if(!(Date.now() - this.lastUpdated > 60000)){
      return;
    }
    
    //Adds JWT to header
    let headers = new HttpHeaders().append("Authorization", `JWT ${localStorage.getItem("authToken")}`);
    this.http.get("/api/buddy", { headers: headers })
      .pipe(
        map(payload =>  (payload["buddy"])), 
        catchError(err => of("Could not access, please check credentials and try again.")))
      .subscribe(buddies => {
        this.lastUpdated = Date.now()
        this.buddyStore.addBuddies(buddies)
      }, 
      err=>{
        this.rootStore.addError(err);
      });
  }

  saveBuddy(buddy: Buddy) {
    this.rootStore.clearFlash();
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
          this.rootStore.addSuccess( `${payload["buddy"].name} successfully saved!`)
          return payload["buddy"];
        }), 
        catchError(err => of("Could not access, please check credentials and try again."))
      )
      .subscribe(buddy => this.buddyStore.createBuddy(buddy), 
      err=> this.rootStore.addError(err));
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
          this.rootStore.addSuccess(msg)
          return payload["buddy"];
        }),
        catchError(err => of("Could not access, please check credentials and try again."))
      )
      .subscribe(buddy => this.buddyStore.updateBuddy(buddy), 
        err=> this.rootStore.addError(err));
  }

  deleteBuddy(buddy: Buddy) {
    this.rootStore.clearFlash();
    let headers = new HttpHeaders().append(
      "Authorization",
      `JWT ${localStorage.getItem("authToken")}`
    );
    this.http
      .delete(`/api/buddy/${buddy._id}`, { headers: headers })
      .pipe(
        map(payload => {
          // this.store.dispatch({
          //   type: flashActions.ADD_SUCCESS,
          //   payload: `${payload["buddy"].name} successfully deleted!`
          // });
          return payload["buddy"];
        }),
        catchError(err => of("Could not access, please check credentials and try again."))
      )
      .subscribe(buddy => this.buddyStore.deleteBuddy(buddy), 
      err=> this.rootStore.addError(err));
  }
}
