// # Buddy Service
import { Injectable} from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, catchError, debounceTime } from "rxjs/operators";
import { Buddy } from "../models/buddy.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BuddyStoreFacade } from "../store";
import {RootStoreFacade} from '../../store';
import { BuddyResponse } from "../models/buddy-response.model";

@Injectable()
export class BuddyService{
  buddies: Observable<Array<Buddy>>;
  constructor(private http: HttpClient, private buddyStore: BuddyStoreFacade, private rootStore: RootStoreFacade) {
    this.buddies = buddyStore.buddies$;
  }

  // Pulls all buddies based off current JWT token in localStorage
  // Updates the store and saves locally if data hasn't changed in 60 seconds
  loadBuddies() {
    //Adds JWT to header
    let headers = new HttpHeaders().append("Authorization", `JWT ${localStorage.getItem("authToken")}`);
    this.http.get("/api/buddy", { headers: headers })
      .pipe(
        debounceTime(60000),
        map((res: BuddyResponse) => res.buddies),
        catchError(err => throwError("Could not access, please check credentials and try again.")))
      .subscribe(buddies => 
        this.buddyStore.addBuddies(buddies), 
      err=>{
        this.rootStore.addError(err);
      });
  }

  saveBuddy(buddy: Buddy) {
    this.rootStore.clearFlash();
    buddy.id ? this.updateBuddy(buddy) : this.createBuddy(buddy);
  }

  createBuddy(buddy: Buddy) {
    let headers = new HttpHeaders()
      .append("Content-Type", "application/json")
      .append("Authorization", `JWT ${localStorage.getItem("authToken")}`);
    this.http
      .post("/api/buddy", JSON.stringify(buddy), { headers: headers })
      .pipe(
        map((res: BuddyResponse) => {
          this.rootStore.addSuccess( `${res.buddy.name} successfully saved!`)
          return res.buddy;
        }), 
        catchError(err => throwError("Could not access, please check credentials and try again."))
      )
      .subscribe(buddy => this.buddyStore.createBuddy(buddy), 
      err=> this.rootStore.addError(err));
  }

  checkBuddy(buddy){
    let updatedBuddy = JSON.parse(JSON.stringify(buddy))
    updatedBuddy.checkedOut = !buddy.checkedOut;
    let msg: string =  `${buddy.name} successfully checked ${buddy.checkedOut ? "in" : "out"}.`
    this.updateBuddy(updatedBuddy, msg)
  }

  updateBuddy(buddy: Buddy, msg: string = `${buddy.name} successfully updated!`) {
    let headers = new HttpHeaders()
      .append("Content-Type", "application/json")
      .append("Authorization", `JWT ${localStorage.getItem("authToken")}`);
    this.http
      .put(`/api/buddy/${buddy.id}`, JSON.stringify(buddy), {
        headers: headers
      })
      .pipe(
        map((res: BuddyResponse) => {
          this.rootStore.addSuccess(msg)
          return res.buddy;
        }),
        catchError(err => throwError(err.error.err))
      )
      .subscribe(buddy => { this.buddyStore.updateBuddy(buddy)}, 
        err=> this.rootStore.addError(err ? err : 'Something went wrong, please try again later.'));
  }

  deleteBuddy(buddy: Buddy) {
    this.rootStore.clearFlash();
    let headers = new HttpHeaders().append(
      "Authorization",
      `JWT ${localStorage.getItem("authToken")}`
    );
    this.http
      .delete(`/api/buddy/${buddy.id}`, { headers: headers })
      .pipe(
        map((res: BuddyResponse)=> {
          this.rootStore.addSuccess(`${buddy.name} successfully deleted`)
          return buddy.id;
        }),
        catchError(err => throwError("Could not access, please check credentials and try again."))
      )
      .subscribe(buddy => this.buddyStore.deleteBuddy(buddy), 
      err=> this.rootStore.addError(err));
  }
}
