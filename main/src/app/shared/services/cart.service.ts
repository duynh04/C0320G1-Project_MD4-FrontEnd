import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cart} from '../models/cart';
import {CartDetail} from '../models/cart-detail';
import {CartDetailDTO} from '../models/dtos/cart-detail-dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly API = 'http://localhost:8080/api/v1/cart';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  getCart(userId: number): Observable<Cart> {
    return this.http.get<Cart>(this.API + `?userId=${userId}`, this.httpOptions);
  }

  updateTotalCost(cartId: number): Observable<number> {
    return this.http.put<number>(this.API, {cartId}, this.httpOptions);
  }

  saveToCart(cartDetailDTO: CartDetailDTO): Observable<CartDetail> {
    return this.http.post<CartDetail>(this.API + '/cart-detail', cartDetailDTO, this.httpOptions);
  }

  updateItem(cartDetailId: number, quantity: number): Observable<CartDetail> {
    return this.http.put<CartDetail>(this.API + '/cart-detail', {cartDetailId, quantity}, this.httpOptions);
  }

  deleteItem(cartDetailId: number): Observable<CartDetail> {
    return this.http.delete<CartDetail>(this.API + `/cart-detail/${cartDetailId}`, this.httpOptions);
  }
}
