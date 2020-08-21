import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/categories' ;
  constructor(private http: HttpClient) { }
  getCategoriesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
