import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/v1/userList';

  constructor(
    private http: HttpClient ) { }

  getUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // createUser(user: Object): Observable<Object> {
  //   return this.http.post(`${this.baseUrl}`, user);
  // }
  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
}
