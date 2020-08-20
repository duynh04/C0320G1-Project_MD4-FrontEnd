import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DealManageService {

  public API = 'http://localhost:8080/api/v1/deal-management';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'my-auth-token'
    })
  };

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    responseType: 'text' as 'json'
  };

  constructor(
    public http: HttpClient
  ) { }

  getOnePage(currentPage, pageSize): Observable<any> {
    return this.http.get(this.API + `?page=${currentPage}&limit=${pageSize}`, this.httpOptions);
  }

  setDealsIsDeleted(idsToDelete: number[]): any {
      const data = {ids : idsToDelete};
      return this.http.put<any>(this.API + '/delete', data, this.options);
  }

  search(formValue: any, currentPage: number, pageSize: number) {
    const requestSearchInfo = {
      nameBuyer: formValue.nameBuyer,
      nameSeller: formValue.nameSeller,
      nameProduct: formValue.nameProduct,
      totalPayment: formValue.totalPayment,
      statusOfDeal: formValue.statusOfDeal
    };
    return this.http.post<any>(this.API + `/search?page=${currentPage}&limit=${pageSize}`, requestSearchInfo, this.options);
    }
}


