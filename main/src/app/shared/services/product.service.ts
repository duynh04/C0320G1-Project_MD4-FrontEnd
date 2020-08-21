import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AbstractControl} from '@angular/forms';
import {ProductDto} from '../models/dtos/ProductDto ';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
// Coder: Nguyen Thanh Tu
export class ProductService {
  private  readonly API_URL = 'http://localhost:8080/product';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  addProduct(productCreateDto: AbstractControl): Observable<ProductDto > {
    return this.http.post<ProductDto >(this.API_URL, JSON.stringify(productCreateDto), this.httpOptions);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, this.httpOptions);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product >(this.API_URL + '/' + id);
  }


  editProduct(productCreateDto, id): Observable<ProductDto > {
    return this.http.put<ProductDto >(this.API_URL + '/' + id, productCreateDto);
  }
}





