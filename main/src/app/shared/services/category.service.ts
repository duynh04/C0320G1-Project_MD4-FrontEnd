import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
//Coder: Nguyen Thanh Tu
export class CategoryService {
  private readonly API_URL = 'http://localhost:8080/categories';
  constructor(private http: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({
      'content-Type' : 'application/json'
    })
  };

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_URL);
  }
}
