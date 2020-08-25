import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductPromotion} from '../models/ProductPromotion';
import {ProductPromotionDto} from '../models/dtos/product-promotion-dto';


@Injectable({
  providedIn: 'root'
})
export class ProductPromotionService {

  private baseUrl = 'http://localhost:8080/api/v1/admin/productPromotions';
  private baseUrlDto = 'http://localhost:8080/api/v1/admin/productPromotionsDto';
  private baseUrProduct = 'http://localhost:8080/api/v1/admin/products';
  private baseUrlUser = 'http://localhost:8080/api/v1/admin/users';

  constructor(private http: HttpClient) { }

  getProductPromotion(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getProductPromotionDto(id: number): Observable<any> {
    return this.http.get(`${this.baseUrlDto}/${id}`);
  }


  createProductPromotion(productPromotion: ProductPromotionDto): Observable<any> {
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

  getProductList(): Observable<any> {
    // @ts-ignore
    return this.http.get(`${this.baseUrProduct}`);
  }
  getUserList(): Observable<any> {
    // @ts-ignore
    return this.http.get(`${this.baseUrlUser}`);
  }
}
