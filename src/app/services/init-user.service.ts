import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()

export class InitUserService {
  private user: any = {};
  private isLoggedIn: boolean = false;
  constructor(private http: Http) {
  }
  public getUser(){
    return this.user;
  }
  public getIsLoggedIn(){
    return this.isLoggedIn;
  }

  load(): Promise<any>{
  let headers = new Headers();
  headers.append('Authorization', localStorage.getItem('authToken'));
  return this.http.get('/api/auth/getUser', {headers: headers})
    .map((res: Response) => res.json())
    .toPromise()
    .then(data => {
      if(data.user){
        this.user = data.user;
        this.isLoggedIn = true;
      }

    })
    .catch(err => Promise.resolve())
  }
}
