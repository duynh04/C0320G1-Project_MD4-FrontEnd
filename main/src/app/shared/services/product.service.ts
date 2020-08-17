import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API_PRODUCT = 'http://localhost:8080/api/v1/product';

  constructor(private http: HttpClient) {
  }

  getFavoriteProductsByUserId(userId: number): Observable<any> {
    return this.http.get<any>(this.API_PRODUCT + `/favorite/${userId}`);
  }
}
