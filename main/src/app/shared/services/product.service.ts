import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs"
import { Product } from '../models/product';
import { AbstractControl } from '@angular/forms';
import { ProductDto } from '../models/dtos/ProductDto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  //Son
  ApiProduct = "http://localhost:8081/api/v1/products";
  ApiCategory = "http://localhost:8081/api/v1/categorys";
  ApiOwner = "http://localhost:8081/api/v1/owner";
  private baseUrl = 'http://localhost:8081/api/v1/product/list';

  constructor(private http: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // getProductList(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.ApiProduct);
  // }

   // Thành Long
   getProductList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  addProduct(productCreateDto: AbstractControl): Observable<ProductDto > {
    return this.http.post<ProductDto >(this.ApiProduct, JSON.stringify(productCreateDto), this.httpOptions);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.ApiProduct}/${id}`, this.httpOptions);
  }

  editProductDto(productCreateDto, id): Observable<ProductDto > {
    return this.http.put<ProductDto >(this.ApiProduct + '/' + id, productCreateDto);
  }
  //Son
  addNewProduct(ProductObject): Observable<any> {
    return this.http.post(this.ApiProduct,ProductObject);
  }
  getProductById(idProduct): Observable<any>{
    return this.http.get(this.ApiProduct + "/" + idProduct);
  }
  editProduct(ProductObject,idProduct){
    return this.http.put(this.ApiProduct + "/" + idProduct,ProductObject);
  }

   
  getListCategory():Observable<any>{
    return this.http.get(this.ApiCategory)
  }
  getOwnerById(idOwner): Observable<any>{
    return this.http.get(this.ApiOwner + "/" + idOwner)
  }

}
