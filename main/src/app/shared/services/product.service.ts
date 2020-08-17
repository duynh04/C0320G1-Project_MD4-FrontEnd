import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/v1/product/list';

  constructor(private http: HttpClient) {
  }

  // Thành Long
  getProductList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}
