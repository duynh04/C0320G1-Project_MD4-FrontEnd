import { UserListDTO } from './../models/dtos/user-list-dto';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { Page } from "../models/dtos/page";
import { ProductSearchDTO } from "../models/dtos/productSearchDTO";
import { ProductDto } from '../models/dtos/productDto';
import { UserSearchField } from '../models/dtos/user-search-field';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly ADMIN_URL = "http://localhost:8080/api/v1/admin";
  // Thành Long
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
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
    return this.http.get(`${this.ADMIN_URL}/approvement/${id}`);
  }

  // Thành Long
  approvementProduct(id: number): Observable<any> {
    return this.http.get(`${this.ADMIN_URL}/approvement/approve/${id}`);
  }

  // Thành Long
  unApprovementProduct(banned: string, id: number): Observable<any> {
    const data = { id, banned };
    return this.http.put<any>(`${this.ADMIN_URL}/approvement/unApprove`, data, this.options);

  }

  // Thành Long
  getProduct(searchField: ProductSearchDTO, page: number): Observable<Page<ProductDto>> {
    return this.http.get<Page<ProductDto>>(`${this.ADMIN_URL}/product-list`, this.getProductHttpOptions(searchField, page));
  }

  // Thành Long
  deleteProducts(idsToDelete: number[]): any {
    const data = { ids: idsToDelete };
    return this.http.put<any>(`${this.ADMIN_URL}/product-list/delete`, data, this.options);
  }



  getOnePage(userDto: UserSearchField, page: number): Observable<Page<UserListDTO>> {
    return this.http.get<Page<UserListDTO>>(`${this.ADMIN_URL}/user-list`, this.getUserHttpOptions(userDto, page));
  }

  private getUserHttpOptions(userDto: UserSearchField, page: number): Object {

    let myProductOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: {
        id: userDto.id,
        fullname: userDto.fullname,
        email: userDto.email,
        address: userDto.address,
        rate: userDto.rate,
        page: page
      }
    };
    return myProductOptions;

  }

  getAllUser(): Observable<any> {
    return this.http.get(`${this.ADMIN_URL}`);
  }

  search(formValue: any): Observable<any> {
    console.log(JSON.stringify(formValue));
    this.http.post<any>(this.ADMIN_URL + '/search', JSON.stringify(formValue), this.options).subscribe(data => {
      console.log(data);
    });
    return of({});
  }
}
