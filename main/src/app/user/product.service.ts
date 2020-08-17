import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public readonly API = 'http://localhost:8080/discountList/';

  constructor(
    public http: HttpClient
  ) {}

  getAllProduct(): Observable<any> {
    return this.http.get(this.API);
  }
}
