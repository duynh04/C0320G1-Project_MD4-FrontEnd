import { UserUpdateDto } from '../models/dtos/UserUpdateDto';
import { User } from './../models/user';
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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ` + this.tokenStorage.getUser().jwttoken })
  //   , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  // };
  //creator: Nguyễn Xuân Hùng
  getUserById(id) : Observable<UserUpdateDto>{
    return this.http.get<UserUpdateDto>(this.API_URL_USER+id,this.httpOptions);
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
  validateBirthday(c:AbstractControl){
    var chooseDate = new Date(c.value).getTime();
    var currentDate = new Date().getTime();
    return(chooseDate-currentDate>=0) ?
      {chooseDateGreaterThanCurrentDate: true} : null;
  }

  // B-Hoàng Long method
  addUser(user): Observable<any> {
    return this.http.post(this.API_URL_USER, user);
  }

  // B-Hoàng Long method
  lockUpUser(user, id): Observable<User> {
    return this.http.put<User>(this.API_URL_USER + 'lock/' +id, user);
  }

  // B-Hoàng Long method
  search(page: number, pageSize: number, search: string): Observable<any> {
    return this.http.get(this.API_URL_USER + 'lock' + `?page=${page}&size=${pageSize}&search=${search}`);
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

  validateBirthday(c:AbstractControl){
    var chooseDate = new Date(c.value).getTime();
    var currentDate = new Date().getTime();
    return(chooseDate-currentDate>=0) ?
      {chooseDateGreaterThanCurrentDate: true} : null;
  }
}
