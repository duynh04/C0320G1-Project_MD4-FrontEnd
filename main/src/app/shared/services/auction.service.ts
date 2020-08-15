import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private API = 'http://localhost:8080/api/v1/auction';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAuctionById(auctionId: number): Observable<any> {
    return this.httpClient.get(this.API + '/' + auctionId);
  }
}
