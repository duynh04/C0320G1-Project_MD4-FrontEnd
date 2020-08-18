import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AbstractControl} from '@angular/forms';
import {ProductCreateDTO} from '../models/dtos/ProductCreateDTO ';

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

  getProducts(): Observable<ProductCreateDTO[]> {
    return this.http.get<ProductCreateDTO []>(this.API_URL);
  }

  addProduct(productCreateDto: AbstractControl): Observable<ProductCreateDTO > {
    return this.http.post<ProductCreateDTO >(this.API_URL, JSON.stringify(productCreateDto), this.httpOptions);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, this.httpOptions);
  }

  getProductById(id: number): Observable<ProductCreateDTO > {
    return this.http.get<ProductCreateDTO >(this.API_URL + '/' + id);
  }


  editProduct(productCreateDto, id): Observable<ProductCreateDTO > {
    return this.http.put<ProductCreateDTO >(this.API_URL + '/' + id, productCreateDto);
  }
}





