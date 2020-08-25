import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
// Creator Nguyen Thanh Tu
export class CategoryService {
  ApiCategories = 'http://localhost:8081/api/v1/categories';
  constructor(private http: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({
      'content-Type' : 'application/json'
    })
  };

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.ApiCategories, this.httpOption);
  }
}
