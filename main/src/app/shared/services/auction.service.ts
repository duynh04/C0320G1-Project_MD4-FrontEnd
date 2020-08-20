import { WebsocketService } from './../../websocket.service';

import { AuctionRecord } from './../models/auction-record';
import { Auction } from './../models/auction';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../models/dtos/page';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': `Bearer `+ 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuZ2FuQGdtYWlsLmNvbSIsImV4cCI6MTU5Nzk0MzgxMywidXNlcklkIjo0LCJpYXQiOjE1OTc5MjU4MTN9.iz-sJ-jgaIFHm_H0Ci1cRLqige7pBz5iPm03P5VDcYhQoTsgOtzD2lcIWCMImwt8mVBuimc3l28k0RIy1z-k8Q'}),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
  // Creator: Cường
  private readonly API_URL = "http://localhost:8080/api/v1";
  
  private auctionAPI = 'http://localhost:8080/api/v1/auctions';

  private recordAPI = 'http://localhost:8080/api/v1/auctionRecords'

  private toprecordAPI = 'http://localhost:8080/api/v1/topAuctionRecords'

  private currentPrice = "http://localhost:8080/api/v1/highestPrice"

  constructor(private httpClient: HttpClient) { }

       

  getAuctionById(auctionId: number): Observable<Auction> {
    return this.httpClient.get<Auction>(this.auctionAPI + `/${auctionId}`, this.httpOptions);
  
  }

  getTopAuctionRecords(auctionId: number): Observable<any>{
    return this.httpClient.get(this.toprecordAPI + '/' + auctionId, this.httpOptions);
  }

  getRecordHavingBestPrice(auctionId: number): Observable<any>{
    return this.httpClient.get(this.currentPrice + '/' + auctionId, this.httpOptions);
  }

  editRecordHavingBestPrice(auctionId: number, auctionRecord: AuctionRecord): Observable<any>{
    return this.httpClient.put(this.currentPrice + '/' + auctionId, JSON.stringify(auctionRecord), this.httpOptions)
  }

  editAuctionById(auctionId: number, auction: Auction): Observable<any>{
    return this.httpClient.put(this.auctionAPI + '/' + auctionId, JSON.stringify(auction), this.httpOptions) ;
  }

  saveNewAuctionRecord(auctionRecord: AuctionRecord): Observable<any> {
    return this.httpClient.post(this.recordAPI, auctionRecord, this.httpOptions);
  }

 



 



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
      
      return this.httpClient.get<Page<AuctionRecord>>(this.API_URL + "/myAuctionRecords/" + bidderId,
      this.getMyAuctionRecordHttpOptions(productName,recordStatusName,page));

  }

}
