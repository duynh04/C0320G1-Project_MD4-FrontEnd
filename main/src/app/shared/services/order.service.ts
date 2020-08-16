import { OrderDto } from "./../models/dtos/orderDto";
import { Order } from "./../models/order";
import { Observable } from "rxjs";
import { User } from "./../models/user";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}
  private readonly API_URL = "http://localhost:8080/api/v1/order";

  getOrderByBuyerId(buyerId: Number): Observable<Order> {
    return this.httpClient.get<Order>(this.API_URL + `/${buyerId}`);
  }

  createOrder(orderDto: OrderDto): Observable<OrderDto> {
    return this.httpClient.post<OrderDto>(this.API_URL, orderDto);
  }

  // updateContract(contract: IContract): Observable<IContract> {
  //   return this.httpClient.put<IContract>(
  //     this.API_URL + `/${contract.id}`,
  //     contract
  //   );
  // }
}
