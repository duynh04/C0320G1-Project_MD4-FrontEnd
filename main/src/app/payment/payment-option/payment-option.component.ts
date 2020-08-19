import { Router } from "@angular/router";
import { OrderDto } from "./../../shared/models/dtos/orderDto";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { IPayPalConfig } from 'ngx-paypal';

import { OrderService } from "src/app/shared/services/order.service";
import { PaymentService } from 'src/app/shared/services/payment.service';
@Component({
  selector: "app-payment-option",
  templateUrl: "./payment-option.component.html",
  styleUrls: ["./payment-option.component.css"],
})

//creator: Đặng Hồng Quân team C
export class PaymentOptionComponent implements OnInit {
  // Duy 
  //paypal config
  public payPalConfig?: IPayPalConfig;
  //
  orderForm: FormGroup;
  payments: any;
  orderDto: OrderDto = new OrderDto();
  paymentMethod: String;
  deliveryMethod: String = "Giao hàng tiêu chuẩn";
  deliveryAddress: String



  constructor(
    private orderService: OrderService,
    private router: Router,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    // initialize paypal
    this.initPayPalSdk();
  };


  selectPayment(pay) {
    this.payments = pay;
  }

  onSubmit() {
    console.log(this.orderForm.value.paymentMethod);
    this.orderDto.paymentMethod = this.paymentMethod;
    this.orderDto.deliveryMethod = this.deliveryMethod;
    if (this.orderForm.value.paymentMethod == "Thanh toán trực tiếp") {
      this.orderDto.paymentState = "Đang chờ thanh toán";
    } else {
      this.orderDto.paymentState = "Đã thanh toán thành công";
    }
    this.orderDto.deliveryAddress = this.deliveryAddress;
    this.orderDto.buyer.id = 1;

    this.orderService
      .createOrder(this.orderDto)
      .subscribe(() => this.router.navigate(["payment/order"]));
  }

  private initPayPalSdk(): void {
    this.payPalConfig = {
      clientId: 'AbCzPUUevBpwehD2HBR8Y0_ic2rt8ldWn-y_nn7SgR04TvK3r9tLU9MZonzGDnXTq5exF5hlhdll6wMp',
      style: {
        layout: 'horizontal'
      },
      createOrderOnServer: (data: any) => {
        return this.paymentService.setTransaction(1).toPromise().then(res => {
          // console.log(res);
          this.paymentService.captureOrder = res;
          return res.id;
        });
      },
      onApprove: (data) => {
        this.paymentService.confirmTransaction(data.orderID).subscribe(res => {
          console.log(`confirm transaction: ${res.status}`);
        });
      },
      onError: err => {
        console.log('OnError', err);
      },
    };
  }
}
