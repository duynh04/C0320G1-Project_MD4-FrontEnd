import { Auction } from './../models/auction';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuctionRecord } from './../models/auction-record';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Page } from '../models/dtos/page';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  //creator: Hung-test
  private readonly API_URL_AUCTION = "http://localhost:8080/api/v1/auctions/";
  getAllAuctions():Observable<Auction[]>{
    return this.http.get<Auction[]>(this.API_URL_AUCTION);
  }

  // Creator: Cường
  private readonly API_URL = "http://localhost:8080/api/v1";

  constructor(private http : HttpClient) { }

  // Creator: Cường
  getMyAuctionRecordHttpOptions(productName : string, 
    recordStatusName : string, page : number) : Object {

    let myAuctionRecordHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: {
        productName : productName,
        recordStatusName : recordStatusName,
        page : page
      }
    };
    return myAuctionRecordHttpOptions;

  }

  // Creator: Cường
  getMyAuctionRecords(bidderId : number,productName : string, 
    recordStatusName : string, page : number) : Observable<Page<AuctionRecord>> {
      
      return this.http.get<Page<AuctionRecord>>(this.API_URL + "/myAuctionRecords/" + bidderId,
      this.getMyAuctionRecordHttpOptions(productName,recordStatusName,page));

  }

}
