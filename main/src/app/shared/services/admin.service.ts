import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../models/product';
import {Page} from "../models/dtos/page";
import {ProductSearchDTO} from "../models/dtos/productSearchDTO";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080/api/v1/admin';
  // private approveUrl = 'http://localhost:8080/api/v1/admin/approvement/approve';
  // private unApproveUrl = 'http://localhost:8080/api/v1/admin/approvement/unApprove';

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    responseType: 'text' as 'json'
  };
  constructor(private http: HttpClient) {
  }

  // Thành Long
  getProductHttpOptions(searchField: ProductSearchDTO, page: number): Object {
    const product = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      params: {
        name: searchField.name,
        category: searchField.category,
        minPrice: searchField.minPrice,
        maxPrice: searchField.maxPrice,
        status: searchField.status,
        owner: searchField.owner,
        page
      }
    };
    return product;
  }

  // Thành Long
  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/approvement/${id}`);
  }

  // Thành Long
  approvementProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/approvement/approve/${id}`);
  }

  // Thành Long
  unApprovementProduct(banned: string, id: number): Observable<any> {
    const data = {id, banned};
    return this.http.put<any>(`${this.baseUrl}/approvement/unApprove`, data, this.options);

  }

  // Thành Long
  getProduct(searchField: ProductSearchDTO, page: number): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(`${this.baseUrl}/product-list`, this.getProductHttpOptions(searchField, page));
  }

  // Thành Long
  deleteProducts(idsToDelete: number[]): any {
    const data = {ids : idsToDelete};
    return this.http.put<any>(`${this.baseUrl}/product-list/delete`, data, this.options);
  }



}
