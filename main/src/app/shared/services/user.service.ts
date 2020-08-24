import { UserUpdateDto } from '../models/dtos/UserUpdateDto';
import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly API_URL_USER = "http://localhost:8080/api/v1/user/";


  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  //creator: Nguyễn Xuân Hùng
  getUserById(id): Observable<UserUpdateDto> {
    return this.http.get<UserUpdateDto>(this.API_URL_USER + id);
  }

  //creator: Nguyễn Xuân Hùng
  updateUser(user: UserUpdateDto, id): Observable<UserUpdateDto> {
    return this.http.put<UserUpdateDto>(this.API_URL_USER + 'update/' + id, JSON.stringify(user), this.httpOptions);
  }

  //creator: Nguyễn Xuân Hùng
  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.newPassword === v.confirmPassword) ? null : {
      passwordnotmatch: true
    }
  }
 // Duc
  API = 'http://localhost:8080/api/v1';

  sendEmailRecover(email): Observable<any> {
    const link = this.API + '/recover/' + email.email;
    return this.http.get(link);
  }

  sendCodeRecover(email, code): Observable<any> {
    const link = this.API + '/recover/' + email.email + '/' + code.code;
    return this.http.get(link);
  }

  sendInfoRecover(user): Observable<any> {
    const link = this.API + '/recover';
    return this.http.post(link, user);
  }
  sendCodeVerify(info): Observable<any> {
    const link = this.API + '/verify';
    return this.http.post(link, info);
  }


}
