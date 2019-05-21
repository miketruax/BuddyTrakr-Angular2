import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { User } from "../models/user.model";
import { UserResponse } from "../models/user-response.model";

@Injectable()
export class InitUserService {
  isLoggedIn: boolean = false;
  user: User = {};
  constructor(private http: HttpClient) {}
  load() {
    let headers = new HttpHeaders().append(
      "Authorization",
      `JWT ${localStorage.getItem("authToken")}`
    );
    let observable = this.http.get("/api/user", { headers: headers })
    .pipe(
      map((res: UserResponse)=>{
        return {isLoggedIn: !!res.user.id, user:res.user}
      }),
      catchError(err => {
        return of({isLoggedIn: false, user: {}})
      })
    );
    return observable.toPromise().then(
      (res)=>{
        this.isLoggedIn = res.isLoggedIn;
        this.user = res.user;
      }
      );
  }
}
