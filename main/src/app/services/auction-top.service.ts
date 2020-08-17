import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionTopService {
  public API: string = 'http://localhost:8080/api/v1/user';
  public API1: string = 'http://localhost:8080/api/v1/product';
  public API2: string = 'http://localhost:8080/api/v1/product/image';

  constructor(
    public http: HttpClient
  ) { }

  getAuctionTop(): Observable<any> {
    return this.http.get(this.API);
  }
  getAuctionTop1(): Observable<any> {
    return this.http.get(this.API1);
  }
  getAuctionTop2(): Observable<any> {
    return this.http.get(this.API2);
  }
}
