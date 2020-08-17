import { Router } from '@angular/router';
import { OrderService } from './../../shared/services/order.service';
import { Order } from './../../shared/models/order';
import { Component, OnInit } from '@angular/core';
declare let Email: any;
@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css'],
})
export class OrderStatusComponent implements OnInit {
  order: Order;
  deliveryPrice: number;
  serviceFee: number;
  totalCost: number;
  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.orderService.getOrderByBuyerId(1).subscribe((data) => {
      this.order = data;
      if (data.deliverMethod == 'Giao hàng tiêu chuẩn') {
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

  sendMail(buttonStatus) {
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'quandanght@gmail.com',
      Password: 'E528393F610CF064ECC039D0468AC7825EA6',
      To: 'haitac51196@gmail.com',
      From: 'quandanght@gmail.com',
      Subject: 'test mail',
      Body: 'Thành công',
    }).then((message) => {
      console.log(message);
    });
    this.order.status = false;
    this.orderService.updateOrder(this.order).subscribe((data) => {
      console.log(data);
    });

    if (buttonStatus == 'không') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
