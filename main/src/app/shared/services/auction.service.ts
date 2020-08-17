
import { AuctionRecord } from './../models/auction-record';
import { Auction } from './../models/auction';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  private auctionAPI = 'http://localhost:8080/api/v1/auctions';

  private recordAPI = 'http://localhost:8080/api/v1/auctionRecords'

  private toprecordAPI = 'http://localhost:8080/api/v1/topAuctionRecords'

  private currentPrice = "http://localhost:8080/api/v1/highestPrice"

  constructor(private httpClient: HttpClient) { }

  getAuctionById(auctionId: number): Observable<Auction> {
    return this.httpClient.get<Auction>(this.auctionAPI + `/${auctionId}`);
  
  }

  getTopAuctionRecords(auctionId: number): Observable<any>{
    return this.httpClient.get(this.toprecordAPI + '/' + auctionId);
  }

  getRecordHavingBestPrice(auctionId: number): Observable<any>{
    return this.httpClient.get(this.currentPrice + '/' + auctionId);
  }

  editRecordHavingBestPrice(auctionId: number, auctionRecord: AuctionRecord): Observable<any>{
    return this.httpClient.put(this.currentPrice + '/' + auctionId, JSON.stringify(auctionRecord), this.httpOptions)
  }

  editAuctionById(auctionId: number, auction: Auction): Observable<any>{
    return this.httpClient.put(this.auctionAPI + '/' + auctionId, JSON.stringify(auction), this.httpOptions) ;
  }

  saveNewAuctionRecord(auctionRecord: AuctionRecord): Observable<any> {
    return this.httpClient.post(this.recordAPI, auctionRecord);
  }

 



}
