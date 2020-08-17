import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionProductService {
  public API1: string = 'http://localhost:8080/api/v1/product';
  public API2: string = 'http://localhost:8080/api/v1/product/image';

  constructor(
    public http: HttpClient
  ) { }
  getAuctionProduct1(): Observable<any> {
    return this.http.get(this.API1);
  }
  getAuctionProduct2(): Observable<any> {
    return this.http.get(this.API2);
  }
}
