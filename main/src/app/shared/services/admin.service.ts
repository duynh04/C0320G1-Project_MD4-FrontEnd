import { UserListDTO } from './../models/dtos/user-list-dto';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Page } from '../models/dtos/page';
import { UserSearchField } from '../models/dtos/user-search-field';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly ADMIN_URL = "http://localhost:8080/api/v1/admin"
  constructor(
    private http: HttpClient
  ) { }

  private httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  getOnePage(userDto: UserSearchField, page: number): Observable<Page<UserListDTO>> {
    return this.http.get<Page<UserListDTO>>(`${this.ADMIN_URL}/user-list`, this.getUserHttpOptions(userDto, page));
  }

  private getUserHttpOptions(userDto: UserSearchField, page: number) : Object {

    let myProductOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: {
        id : userDto.id,
        fullname : userDto.fullname,
        email: userDto.email,
        address: userDto.address,
        rate: userDto.rate,
        page : page
      }
    };
    return myProductOptions;

  }

  getAllUser(): Observable<any> {
    return this.http.get(`${this.ADMIN_URL}`);
  }

  search(formValue: any): Observable<any> {
    console.log(JSON.stringify(formValue));
    this.http.post<any>(this.ADMIN_URL + '/search', JSON.stringify(formValue), this.httpOptions).subscribe(data => {
      console.log(data);
    });
    return of({});
  }
}
