import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public readonly API = 'http://localhost:8080/discountList/';
  public content: string;
  public saleDate: string;
  public endOfEvent: string;
  public percent: string;

  constructor(
    public http: HttpClient
  ) {}

  getAllProduct(): Observable<any> {
    return this.http.get(this.API);
  }

  searchProduct( content, saleDate, endOfDate, percent ): Observable<any> {
    return this.http.get(this.API + '/search/?' +
                          'content=' + content +
                          '&saleDate=' + saleDate +
                          '&endOfEvent' + endOfDate +
                          'percent' + percent
    );
  }
}
