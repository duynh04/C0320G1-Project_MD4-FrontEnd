import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DealManageService {

  public url_API = 'http://localhost:8080/api/v1/admin/deal-management';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    responseType: 'text' as 'json'
  };

  constructor(
    public http: HttpClient
  ) { }

  getOnePage(currentPage, pageSize): Observable<any> {
    return this.http.get(this.url_API + `?page=${currentPage}&limit=${pageSize}`, this.httpOptions);
  }

  setDealsIsDeleted(idsToDelete: number[]): any {
      return this.http.put<any>(this.url_API + '/delete', JSON.stringify(idsToDelete), this.options);
  }

  search(formValue: any, currentPage: number, pageSize: number) {
    return this.http.post<any>(this.url_API + `/search?page=${currentPage}&limit=${pageSize}`, JSON.stringify(formValue), this.options);
  }
}


