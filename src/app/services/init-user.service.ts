import { Injectable } from "@angular/core";
import * as fromRoot from "../reducers";
import { User } from "../stores/user.store";
import { flashActions, userActions, buddyActions } from "../actions";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class InitUserService {
  private user: any = {};
  private isLoggedIn: boolean = false;
  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {}
  load() {
    if (localStorage.getItem("authToken")) {
      let headers = new HttpHeaders().append(
        "Authorization",
        localStorage.getItem("authToken")
      );
      this.http
        .get("/api/auth/getUser", { headers: headers })
        .subscribe(data => localStorage.setItem("user", JSON.stringify(data["user"])));
    }
  }
}
