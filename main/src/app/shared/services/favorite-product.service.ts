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
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Created by : Toàn
   *
   * Lấy danh sách sản phẩm yêu thích của một user
   */
  getByUserId(userId: number, page: number): Observable<any> {
    return this.http.get<any>(this.API_PRODUCT_FAVORITE + `?userId=${userId}&page=${page}`, this.httpOptions);
  }

  /**
   * Created by : Toàn
   *
   * Xóa một sản phẩm khỏi danh sách yêu thích
   */
  deleteById(favoriteProductId: number) {
    return this.http.delete(this.API_PRODUCT_FAVORITE + `/${favoriteProductId}`, this.httpOptions);
  }
}
