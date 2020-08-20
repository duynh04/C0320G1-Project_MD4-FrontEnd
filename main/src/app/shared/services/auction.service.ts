import { Auction } from './../models/auction';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private readonly API_URL_AUCTION = "http://localhost:8080/api/v1/auctions/";
  constructor(private http:HttpClient) { }
  getAllAuctions():Observable<Auction[]>{
    return this.http.get<Auction[]>(this.API_URL_AUCTION);
  }
}
