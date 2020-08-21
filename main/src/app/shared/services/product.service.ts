import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/products' ;
  constructor(private http: HttpClient) { }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, product);
  }

  // // Creator: Cường
  // private readonly API_URL = "http://localhost:8080/api/v1";
  //
  // constructor(private http: HttpClient) { }
  //
}
