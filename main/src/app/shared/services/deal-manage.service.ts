import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(
    public http: HttpClient
  ) { }

  getOnePage(currentPage, pageSize): Observable<any> {
    return this.http.get(this.API + `?page=${currentPage}&limit=${pageSize}`, this.httpOptions);
  }

  deleteDeals(idsToDelete: number[]): Observable<any> {
    return this.http.put<number[]>(this.API + '/delete', idsToDelete, this.httpOptions);
  }

  deleteOneDealById(id: number): Observable<any> {
    return this.http.put<number>(this.API + `/delete/${id}`, this.httpOptions);
  }

  findDealById(id: number): Observable<any> {
    return this.http.get(this.API + `/${id}`, this.httpOptions);
  }

  search(formValue): Observable<any> {
    return this.http.get(this.API + '/search', formValue);
  }
}
