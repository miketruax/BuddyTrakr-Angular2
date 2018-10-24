import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class InitUserService {
  constructor(private http: HttpClient) {
  }
  load() {
    if (localStorage.getItem("authToken")) {
      let headers = new HttpHeaders().append(
        "Authorization",
        localStorage.getItem("authToken")
      );
      this.http
        .get("/api/user", { headers: headers }).pipe(
          catchError((err)=>{ 
            console.log(err);
            return of(new Error())
          }))
        .subscribe(data => {
          console.log(data);
          localStorage.setItem("user", JSON.stringify(data["user"]))}, 
          err=>{localStorage.clear();});
    }
    
  }
}
