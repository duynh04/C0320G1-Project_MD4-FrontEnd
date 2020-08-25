import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductImage} from "../models/product-image";

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {
  ApiProductImage = 'http://localhost:8081/api/v1/productImages'

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getImageList(): Observable<ProductImage[]> {
    return this.http.get<ProductImage[]>(this.ApiProductImage);
  }
}
