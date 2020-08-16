import { OrderService } from "./../../shared/services/order.service";
import { Observable } from "rxjs";
import { Order } from "./../../shared/models/order";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-order-status",
  templateUrl: "./order-status.component.html",
  styleUrls: ["./order-status.component.css"],
})
export class OrderStatusComponent implements OnInit {
  order: Order;
  deliveryPrice: number;
  serviceFee: number;
  totalCost: number;
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrderByBuyerId(1).subscribe((data) => {
      this.order = data;
      if (data.deliverMethod == "Giao hàng tiêu chuẩn") {
        this.deliveryPrice = 50000;
      } else {
        this.deliveryPrice = 100000;
      }
      this.serviceFee = data.cart.totalPrice * (10 / 100);
      this.totalCost =
        data.cart.totalPrice + this.serviceFee + this.deliveryPrice;
      console.table(this.order);
    });
  }

  sendMail() {}
}
