import { UserUpdateDto } from '../models/dtos/UserUpdateDto';
import { User } from './../models/User';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly API_URL_USER = "http://localhost:8080/api/v1/user/"
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    responseType: 'text' as 'json'
  };
  
  //creator: Nguyễn Xuân Hùng
  getUserById(id) : Observable<UserUpdateDto>{
    return this.http.get<UserUpdateDto>(this.API_URL_USER+id);
  }
  //creator: Nguyễn Xuân Hùng
  updateUser(user: UserUpdateDto, id) : Observable<UserUpdateDto>{
    return this.http.put<UserUpdateDto>(this.API_URL_USER+'update/'+id,JSON.stringify(user),this.httpOptions);
  }
  //creator: Nguyễn Xuân Hùng
  comparePassword(c: AbstractControl){
    const v = c.value;
    return (v.newPassword === v.confirmPassword) ? null : {
      passwordnotmatch : true
    }
  }
  getOnePage(currentPage, pageSize): Observable<any> {
    return this.http.get(this.API_URL_USER + `?page=${currentPage}&limit=${pageSize}`, this.httpOptions);
  }
  
  getAllUser(): Observable<any> {
    return this.http.get(`${this.API_URL_USER}`);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL_USER}/${id}`, { responseType: 'text' });
  }
  search(formValue: any): Observable<any> {
    console.log(JSON.stringify(formValue));
    this.http.post<any>(this.API_URL_USER + '/search', JSON.stringify(formValue), this.options).subscribe(data => {
      console.log(data);
    });
    return of({});
  }
}
