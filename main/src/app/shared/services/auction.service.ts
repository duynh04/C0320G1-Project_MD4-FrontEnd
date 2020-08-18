import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Auction} from '../models/auction';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private API = 'http://localhost:8080/api/v1/auctions';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAuctionById(auctionId: number): Observable<any> {
    return this.httpClient.get(this.API + '/' + auctionId);
  }

  getAuctionByProductId(productId: number): Observable<Auction> {
    return this.httpClient.get<Auction>(this.API + '/product/' + productId);
  }
}
