import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/products' ;
  constructor(private http: HttpClient) { }

  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, product);
  }

  // Creator: Cường
  // private readonly API_URL = "http://localhost:8080/api/v1";
  //
  // constructor(
  //   private http: HttpClient,
  //   private tokenStorage : TokenStorageService
  // ) { }

  // Creator: Cường
  // testError() : Observable<TestUser | ErrorDetail> {
  //   return this.http.get<TestUser | ErrorDetail>("http://localhost:8088/api/v1/employees/3",{
  //       headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   }).pipe(catchError(handler));
  // }

  // // Creator: Cường
  // getMyProductHttpOptions(productName : string, approvementStatusName : string,page : number) : Object {
  //
  //   let myProductOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //     params: {
  //       productName : productName,
  //       approvementStatusName : approvementStatusName,
  //       page : page
  //     }
  //   };
  //   return myProductOptions;
  //
  // }
  //
  // // Creator: Cường
  // getCancelProductHttpOptions(productName : string, approvementStatusName : string,cancelProductId : number,page : number) : Object {
  //
  //   let cancelProductOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     params: {
  //       productName : productName,
  //       approvementStatusName : approvementStatusName,
  //       cancelProductId : cancelProductId,
  //       page : page
  //     }
  //   };
  //   return cancelProductOptions;
  //
  // }
  //
  // // Creator: Cường
  // getMyProducts(ownerId : number,productName : string,approvementStatusName : string,
  //               page :number) : Observable<Page<Product>> {
  //
  //   return this.http.get<Page<Product>>(this.API_URL + "/myProduct/" + ownerId,
  //     this.getMyProductHttpOptions(productName,approvementStatusName,page))
  // }
  //
  // // Creator: Cường
  // cancelRegister(ownerId : number,productName : string,approvementStatusName : string,
  //                cancelProductId : number, page : number) : Observable<Page<Product>> {
  //
  //   return this.http.put<Page<Product>>(this.API_URL + "/myProduct/cancel/" + ownerId,null,
  //     this.getCancelProductHttpOptions(productName,approvementStatusName,cancelProductId,page))
  // }

}
