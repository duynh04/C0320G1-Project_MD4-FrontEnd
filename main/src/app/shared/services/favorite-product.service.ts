import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteProductService {

  private readonly API_PRODUCT_FAVORITE = 'http://localhost:8080/api/v1/product/favorite';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }

  getByUserId(userId: number, page: number): Observable<any> {
    return this.http.get<any>(this.API_PRODUCT_FAVORITE + `?userId=${userId}&page=${page}`, this.httpOptions);
  }

  deleteById(favoriteProductId: number) {
    return this.http.delete(this.API_PRODUCT_FAVORITE + `/${favoriteProductId}`, this.httpOptions);
  }
}
