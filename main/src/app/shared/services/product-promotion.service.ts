import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductPromotion} from '../models/ProductPromotion';


@Injectable({
  providedIn: 'root'
})
export class ProductPromotionService {

  private baseUrl = 'http://localhost:8080/api/v1/productPromotions';
  private baseUrl2 = 'http://localhost:8080/api/v1/productPromotionsDto';

  constructor(private http: HttpClient) { }

  getProductPromotion(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getProductPromotionDto(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl2}/${id}`);
  }


  createProductPromotion(productPromotion: ProductPromotion): Observable<any> {
    return this.http.post(`${this.baseUrl}`, productPromotion);
  }


  updateProductPromotion(id: any, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteProductPromotion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getProductPromotionList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
