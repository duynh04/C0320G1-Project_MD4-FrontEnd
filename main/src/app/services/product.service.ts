import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public API: string = 'http://localhost:8080/api/v1/product';

  constructor(
    public http: HttpClient
  ) { }
  getProduct(id: number): Observable<any> {
    return this.http.get(this.API);
  }
}
