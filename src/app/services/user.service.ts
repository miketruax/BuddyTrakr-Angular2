import { Injectable} from "@angular/core";
import { map, catchError, take} from "rxjs/operators";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RootStoreFacade } from "../store";
import { User } from "../models/user.model";
import { UserResponse } from "../models/user-response.model";
import { BuddyStoreFacade } from "../buddies/store";
import { throwError } from "rxjs/internal/observable/throwError";
import { InitUserService } from "./init-user.service";

@Injectable()
export class UserService{
  isLoggedIn: boolean;
  constructor(
    private router: Router,
    private initUserService: InitUserService,
    private http: HttpClient,
    private rootStore: RootStoreFacade,
    private buddyStore: BuddyStoreFacade
  ) {
    this.rootStore.selectUser(this.initUserService.user);
    this.isLoggedIn = this.initUserService.isLoggedIn;
  }

  login(username, password) {
    let headers = new HttpHeaders().append("Content-Type", "application/json");
    this.rootStore.clearFlash();
    this.http
      .post("/api/auth/login", JSON.stringify({ username, password }), {
        headers: headers
      })
      .pipe(
        map((res: UserResponse)=> {
            localStorage.setItem("authToken", res.token);
            this.isLoggedIn = true;
            this.router.navigate(["/buddies"]);
            this.rootStore.selectUser(res.user)
            return `Welcome Back ${res.user.username}!`
          }),
        catchError(error => throwError(error.error || "Something Went Wrong. Please Try Again Later.")))
        .subscribe(msg => 
          this.rootStore.addSuccess(msg), 
        err=> {
          this.rootStore.addError(err)} );
  }

  signup(username, password, email) {
    this.rootStore.clearFlash();
    let headers = new HttpHeaders().append("Content-Type", "application/json");
    this.http
      .post("/api/auth/signup", JSON.stringify({ username, password, email }), {
        headers: headers
      })
      .pipe(
        map((res: UserResponse) => {
            this.router.navigate(["/login"]);
             return "Successfully signed up, please log in!"
            }
        ), 
        catchError(err=> throwError(err.error || "Something went wrong. Please Try Again later.")))
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
        "/api/user/update",
        JSON.stringify({ currentPassword, newPassword }),
        { headers: headers }
      )
      .pipe(
        map((res: UserResponse)=> {
            localStorage.setItem("authToken", res.token);  
            this.router.navigate(["/buddies"]);
            return "Successfully updated password.";
        }), 
        catchError(err=> {
          return throwError(err.error || "Something went wrong, please check your entries and try again.")
        })
      )
      .subscribe(msg=> {this.rootStore.addSuccess(msg);
      }, 
      err=> this.rootStore.addError(err));
  }

  logout() {
    this.buddyStore.addBuddies([])
    this.rootStore.clearUser()
    this.isLoggedIn = false;
    this.rootStore.addSuccess("Successfully Logged Out");
    this.router.navigate(["/login"]);
    localStorage.clear();
  }
}
