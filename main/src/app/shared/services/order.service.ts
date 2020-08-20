import { OrderDto } from "./../models/dtos/orderDto";
import { Order } from "./../models/order";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Injectable({
  providedIn: "root",
})



//creator: Đặng Hồng Quân team C
export class OrderService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ` + this.tokenStorage.getUser().jwttoken })
    , 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {

  }

  private readonly API_URL = "http://localhost:8080/api/v1/payment/order";

  getOrderByBuyerId(buyerId: Number): Observable<Order> {
    return this.httpClient.get<Order>(this.API_URL + `/${buyerId}`, this.httpOptions);
  }

  createOrder(orderDto: OrderDto): Observable<OrderDto> {
    return this.httpClient.post<OrderDto>(this.API_URL, orderDto, this.httpOptions);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(this.API_URL, order, this.httpOptions);
  }

}
