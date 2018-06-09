import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()

export class InitUserService {
  private user: any = {};
  private isLoggedIn: boolean = false;
  constructor(private http: HttpClient) {
  }
  public getUser(){
    return this.user;
  }
  public getIsLoggedIn(){
    return this.isLoggedIn;
  }

  load(){
  let headers = new HttpHeaders().append('Authorization', localStorage.getItem('authToken'));
  const promise = this.http.get('/api/auth/getUser', {headers: headers})
    .toPromise()
    .then(data => {
      if(data['user']){
        this.user = data['user'];
        this.isLoggedIn = true;
      }
      return;
    });
    return promise;
  }
}
