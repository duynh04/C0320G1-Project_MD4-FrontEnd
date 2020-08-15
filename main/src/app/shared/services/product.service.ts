import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API = 'http://localhost:8080/api/v1/product';

  constructor(
    private httpClient: HttpClient
  ) { }

  getProductById(productId: number): Observable<any> {
    return this.httpClient.get(this.API + '/' + productId);
  }
}
