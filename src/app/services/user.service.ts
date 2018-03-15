import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { LoginService } from '../login/login.service';
import { User } from '../model/user';

@Injectable()
export class UserService {
  currentUser: User;
  userList: User[];
  constructor(
    private http: Http,
    private authenticationService: LoginService) {
  }
/*
  getUsers(): Observable<User[]> {
    // add authorization header with jwt token
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    // get users from api
    return this.http.get('/api/users', options)
      .map((response: Response) => response.json());
  }*/
}
