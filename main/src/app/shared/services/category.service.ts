import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})

// Creator Nguyen Thanh Tu
export class CategoryService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/categories' ;
  ApiCategories = 'http://localhost:8080/api/v1/categories';
  constructor(private http: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({
      'content-Type' : 'application/json'
    })
  };
  getCategoriesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.ApiCategories, this.httpOption);
  }
}
