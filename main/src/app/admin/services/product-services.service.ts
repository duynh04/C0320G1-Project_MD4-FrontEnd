import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  ApiProduct = "http://localhost:8081/api/v1/products";
  ApiCategory = "http://localhost:8081/api/v1/categorys"
  ApiOwner = "http://localhost:8081/api/v1/owner"

  private baseUrl = 'http://localhost:8080/api/v1/product/list';

  constructor(private http:HttpClient) { }

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
    // Thành Long
    getProductList(): Observable<any> {
      return this.http.get(`${this.baseUrl}`);
    }
  

}
