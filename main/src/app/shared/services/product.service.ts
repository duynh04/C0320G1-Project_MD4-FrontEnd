import { Product } from './../models/product';
import { Page } from './../models/dtos/page';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Creator: Cường
  private readonly API_URL = "http://localhost:8080/api/v1";
  private baseUrl = 'http://localhost:8080/api/v1/product/list';

  constructor(private http: HttpClient) {
  }

  // Creator: Cường
  getMyProductHttpOptions(productName: string, approvementStatusName: string, page: number): Object {

    let myProductOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: {
        productName: productName,
        approvementStatusName: approvementStatusName,
        page: page
      }
    };
    return myProductOptions;

  }

  // Thành Long
  getProductListHttpOptions(productName: string, productType: string, fullName: string, price: number, auctionStatusName: string, page: number): Object {
    let productListOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: {
        productName: productName,
        productType: productType,
        fullName: fullName,
        price: price,
        auctionStatusName: auctionStatusName,
        page: page
      }
    };
    return productListOptions;
  }

  getProductHttpOptions(page: number): Object {
    let product = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: {
        page: page
      }
    };
    return product;
  }


  // Creator: Cường
  getCancelProductHttpOptions(productName: string, approvementStatusName: string, cancelProductId: number, page: number): Object {

    let cancelProductOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: {
        productName: productName,
        approvementStatusName: approvementStatusName,
        cancelProductId: cancelProductId,
        page: page
      }
    };
    return cancelProductOptions;

  }

  // Creator: Cường
  getMyProducts(ownerId: number, productName: string, approvementStatusName: string,
                page: number): Observable<Page<Product>> {

    return this.http.get<Page<Product>>(this.API_URL + "/myProduct/" + ownerId,
      this.getMyProductHttpOptions(productName, approvementStatusName, page))
  }

  // Creator: Cường
  cancelRegister(ownerId: number, productName: string, approvementStatusName: string,
                 cancelProductId: number, page: number): Observable<Page<Product>> {

    return this.http.put<Page<Product>>(this.API_URL + "/myProduct/cancel/" + ownerId, null,
      this.getCancelProductHttpOptions(productName, approvementStatusName, cancelProductId, page))
  }

  // Thành Long
  getProduct(page: number): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(this.baseUrl, this.getProductHttpOptions(page));
  }
}
