import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  linkAPI = "http:/products";

  constructor(private http:HttpClient) { }

  addNewProduct(ProductObject): Observable<any> {
    return this.http.post(this.linkAPI,ProductObject);
  }
  getProductById(idProduct): Observable<any>{
    return this.http.get(this.linkAPI + "/" + idProduct);
  }

  editProduct(ProductObject,idProduct){
    return this.http.put(this.linkAPI + "/" + idProduct,ProductObject);
  }

}
