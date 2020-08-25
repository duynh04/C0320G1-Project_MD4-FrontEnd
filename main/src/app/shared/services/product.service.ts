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
  ApiProduct = 'http://localhost:8081/api/v1/products';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.ApiProduct);
  }

  addProduct(productCreateDto: AbstractControl): Observable<ProductDto > {
    return this.http.post<ProductDto >(this.ApiProduct, JSON.stringify(productCreateDto), this.httpOptions);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.ApiProduct}/${id}`, this.httpOptions);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product >(this.ApiProduct + '/' + id);
  }


  editProductDto(productCreateDto, id): Observable<ProductDto > {
    return this.http.put<ProductDto >(this.ApiProduct + '/' + id, productCreateDto);
  }
}





