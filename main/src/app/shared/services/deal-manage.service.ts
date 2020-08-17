import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DealManageService {

  public API = 'http://localhost:8080/api/v1/deal-management';

  constructor(
    public http: HttpClient
  ) { }

  getOnePage(currentPage, pageSize): Observable<any> {
    return this.http.get(this.API + `?page=${currentPage}&limit=${pageSize}`);
  }

  deleteDeals(arrayIdToDelete): Observable<any> {
    return this.http.put(this.API + `/delete`, arrayIdToDelete);
  }

  getDealById(id): Observable<any> {
    return this.http.get(this.API + `/${id}`);
  }
  // editEmployee(employee, idEmployee) {
  //   return this.http.put(this.API + `/${idEmployee}`, employee);
  // }
}
