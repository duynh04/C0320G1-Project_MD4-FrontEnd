import { UserUpdateDto } from '../models/dtos/UserUpdateDto';
import { UserDto } from '../models/dtos/userDto';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AbstractControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly API_URL_USER = 'http://localhost:8080/api/v1/user/';
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // creator: Nguyễn Xuân Hùng
  getUserById(id): Observable<UserUpdateDto> {
    return this.http.get<UserUpdateDto>(this.API_URL_USER + id);
  }
  // creator: Nguyễn Xuân Hùng
  updateUser(user: UserUpdateDto, id): Observable<UserUpdateDto> {
    return this.http.put<UserUpdateDto>(this.API_URL_USER + 'update/' + id, JSON.stringify(user), this.httpOptions);
  }
  // creator: Nguyễn Xuân Hùng
  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.newPassword === v.confirmPassword) ? null : {
      passwordnotmatch: true
    };
  }
  // creator: Trương Khánh Mậu
  createUser(userDto: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.API_URL_USER + 'register', JSON.stringify(userDto), this.httpOptions);
  }

  // creator: Trương Khánh Mậu
  checkEmail(email: string): Observable<any> {
    return this.http.post<any>(this.API_URL_USER + 'checkEmail', email, this.httpOptions);
  }

  // creator: Trương Khánh Mậu
  checkPhone(phoneNumber: string): Observable<any> {
    return this.http.post<any>(this.API_URL_USER + 'checkPhone', phoneNumber, this.httpOptions);
  }
}
