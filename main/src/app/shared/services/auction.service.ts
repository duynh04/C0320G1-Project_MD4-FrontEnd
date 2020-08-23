
import { AuctionRecord } from './../models/auction-record';
import { Auction } from './../models/auction';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../models/dtos/page';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
 

  constructor(private httpClient: HttpClient,
              private tokenStorageService: TokenStorageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  }
  // Creator: Cường
  private readonly API_URL = "http://localhost:8080/api/v1";
  
  private auctionAPI = 'http://localhost:8080/api/v1/auctions';

  private recordAPI = 'http://localhost:8080/api/v1/auctionRecords'

  private toprecordAPI = 'http://localhost:8080/api/v1/topAuctionRecords'

  private currentPrice = "http://localhost:8080/api/v1/highestPrice"

  private recordByAuctionAndUser = 'http://localhost:8080/api/v1/auctionRecordByUser'

 

  getRecordByAuctionAndUser(auctionId: number, userId: number): Observable<AuctionRecord> {
    return this.httpClient.get<AuctionRecord>(this.recordByAuctionAndUser + `/${auctionId}/${userId}`, this.httpOptions);
  }     

  getAuctionById(auctionId: number): Observable<Auction> {
    return this.httpClient.get<Auction>(this.auctionAPI + `/${auctionId}`, this.httpOptions);
  
  }

  getTopAuctionRecords(auctionId: number): Observable<any>{
    return this.httpClient.get(this.toprecordAPI + '/' + auctionId, this.httpOptions);
  }

  getRecordHavingBestPrice(auctionId: number): Observable<any>{
    return this.httpClient.get(this.currentPrice + '/' + auctionId, this.httpOptions);
  }

  editRecordHavingBestPrice(auctionRecord: AuctionRecord): Observable<any>{
    return this.httpClient.put(this.currentPrice, JSON.stringify(auctionRecord), this.httpOptions)
  }

  editAuctionById(auction: Auction): Observable<any>{
    return this.httpClient.put(this.auctionAPI, JSON.stringify(auction), this.httpOptions) ;
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
   
   //creator: B-Nguyễn Xuân Hùng.
  getAuctionsProductByAuctionId(id: number):Observable<Auction[]>{
    return this.httpClient.get<Auction[]>(this.API_URL+'/home/auctionStatus/'+id);
  }

   //creator: B-Nguyễn Xuân Hùng.
  getTopAuction():Observable<Auction[]>{
    return this.httpClient.get<Auction[]>(this.API_URL+'/home/topAuction');
  }

   //creator: B-Nguyễn Xuân Hùng.
   getAucionsListByAuctionIdAndCategoryName(id:number,name: string):Observable<Auction[]>{
    return this.httpClient.get<Auction[]>(this.API_URL+'/home/'+id+'/'+name);
  }

  //creator: B-Nguyễn Xuân Hùng.
  searchAuctionsAtHomePage(productName:string, price: string, categoryName: string) :Observable<Auction[]>{
    return this.httpClient.get<Auction[]>(this.API_URL+"/home/search",{params: {productName: productName,price:price,categoryName:categoryName}})
  }

}
