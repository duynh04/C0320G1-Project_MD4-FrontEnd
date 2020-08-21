import { Product } from './../models/product';
import { Page } from './../models/dtos/page';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  public baseUrl = 'http://localhost:8080/api/v1/products' ;
  constructor(private http: HttpClient) { }
  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, product);
  }

  // Creator: Cường
  private readonly API_URL = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) { }

  // Creator: Cường
  getMyProductHttpOptions(productName : string, approvementStatusName : string,page : number) : Object {

    let myProductOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: {
        productName : productName,
        approvementStatusName : approvementStatusName,
        page : page
      }
    };
    return myProductOptions;

  }

  // Creator: Cường
  getCancelProductHttpOptions(productName : string, approvementStatusName : string,cancelProductId : number,page : number) : Object {

    let cancelProductOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: {
        productName : productName,
        approvementStatusName : approvementStatusName,
        cancelProductId : cancelProductId,
        page : page
      }
    };
    return cancelProductOptions;

  }

  // Creator: Cường
  getMyProducts(ownerId : number,productName : string,approvementStatusName : string,
                page :number) : Observable<Page<Product>> {

    return this.http.get<Page<Product>>(this.API_URL + "/myProduct/" + ownerId,
      this.getMyProductHttpOptions(productName,approvementStatusName,page))
  }

  // Creator: Cường
  cancelRegister(ownerId : number,productName : string,approvementStatusName : string,
                cancelProductId : number, page : number) : Observable<Page<Product>> {

    return this.http.put<Page<Product>>(this.API_URL + "/myProduct/cancel/" + ownerId,null,
      this.getCancelProductHttpOptions(productName,approvementStatusName,cancelProductId,page))
  }
  // Thành
  updateProduct(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getProductsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
