import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ApiUser = 'http://localhost:8081/api/v1/users'

  constructor(private http: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.ApiUser);
  }

  getUserById(id): Observable<any> {
    console.log("Id: " +id);
    return this.http.get(this.ApiUser + '/' + id);
  }
}
