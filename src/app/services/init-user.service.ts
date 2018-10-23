import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class InitUserService {
  constructor(private http: HttpClient) {}
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
