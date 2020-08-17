import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../models/Product';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
// Coder: Nguyen Thanh Tu
export class ProductService {
  private  readonly API_URL = 'http://localhost:8080/products\n';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  addProduct(product: AbstractControl): Observable<Product> {
    return this.http.post<Product>(this.API_URL, JSON.stringify(product), this.httpOptions);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, this.httpOptions);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.API_URL + '/' + id);
  }


  editProduct(product, id): Observable<Product> {
    return this.http.put<Product>(this.API_URL + '/' + id, product);
  }
}





