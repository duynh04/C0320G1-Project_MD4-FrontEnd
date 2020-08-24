import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductPromotionService {

  public readonly API = 'http://localhost:8080/api/v1';
  public content: string;
  constructor(
    public http: HttpClient
  ) {}

  getAllProduct(): Observable<any> {
    return this.http.get(this.API + '/productPromotions');
  }

  searchProduct( content, endOfDate, percent ): Observable<any> {
    return this.http.get(this.API + '/productPromotions/search/?' +
      'content=' + content +
      '&endOfEvent=' + endOfDate +
      '&percent=' + percent
    );
  }

  cancelRegister(ownerId: number, productName: string, approvementStatusName: string, id: number, page: number) {

  }
}
