import { Injectable} from "@angular/core";
import { of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RootStoreFacade } from "../store";
import { User } from "../models/user.model";
import { BuddyStoreFacade } from "../buddies/store";

@Injectable()
export class UserService{
  public isLoggedIn: boolean = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private rootStore: RootStoreFacade,
    private buddyStore: BuddyStoreFacade
  ) {
    if(localStorage.getItem('user')){
      this.isLoggedIn = true;
    }
  }

  get user(): User{
      return this.isLoggedIn ? JSON.parse(localStorage.getItem('user')) : null
  }

  login(username, password) {
    let headers = new HttpHeaders().append("Content-Type", "application/json");
    this.rootStore.clearFlash();
    this.http
      .post("/api/auth/login", JSON.stringify({ username, password }), {
        headers: headers
      })
      .pipe(
        map(payload => {
            localStorage.setItem("authToken", payload["token"]);
            localStorage.setItem("user", JSON.stringify(payload['user']));
            this.isLoggedIn = true;
            this.router.navigate(["/buddies"]);
            return payload["user"];
          }),
        catchError(error =>
          of("Something went wrong, please try again later")
        )
      )
      .subscribe(user => this.rootStore.selectUser(user), 
        err=>this.rootStore.addError(err));
  }

  signup(username, password, email) {
    this.rootStore.clearFlash();
    let headers = new HttpHeaders().append("Content-Type", "application/json");
    this.http
      .post("/api/auth/signup", JSON.stringify({ username, password, email }), {
        headers: headers
      })
      .pipe(
        map(payload => {
            this.router.navigate(["/login"]);
             return  "Successfully signed up, please log in!"
            }
        ), 
        catchError(err=> "Something Went wrong. Please check your entries and try again"))
      .subscribe(msg => this.rootStore.addSuccess(msg), 
      err=>this.rootStore.addError(err));
  }

  changePassword(currentPassword, newPassword) {
    this.rootStore.clearFlash();
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
            this.router.navigate(["/buddies"]);
            localStorage.setItem("authToken", payload["token"]);
            return "Successfully updated password.";
        }), 
        catchError(err=> "Something went wrong, please check your entries and try again.")
      )
      .subscribe(msg=> this.rootStore.addSuccess(msg), 
      err=> this.rootStore.addError(err));
  }

  logout() {
    this.buddyStore.addBuddies([])
    this.rootStore.clearUser()
    this.rootStore.addSuccess("Successfully Logged Out");
    this.router.navigate(["/login"]);
    this.isLoggedIn = false;
    localStorage.clear();
  }
}
