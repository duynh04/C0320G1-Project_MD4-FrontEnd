import { Router } from "@angular/router";
import { User } from "./../../shared/models/user";
import { DeliveryAddress } from "./../../shared/models/delivery-address";
import { OrderDto } from "./../../shared/models/dtos/orderDto";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { IPayPalConfig } from 'ngx-paypal';

import { OrderService } from "src/app/shared/services/order.service";
import { PaymentService } from 'src/app/shared/services/payment.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApprovementStatus } from './../../shared/models/approvement-status';

@Component({
  selector: "app-payment-option",
  templateUrl: "./payment-option.component.html",
  styleUrls: ["./payment-option.component.css"],
})
export class PaymentOptionComponent implements OnInit {

  // Duy 
  //paypal config
  payPalConfig?: IPayPalConfig;
  //
  orderForm: FormGroup;
  payments: any;
  orderDto: OrderDto = new OrderDto();
  paymentMethod: string;
  paymentStatus = "FAIL";
  deliveryMethod = "Giao hàng tiêu chuẩn";



  constructor(
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    public http: HttpClient
  ) { }

  ngOnInit() {
    // initialize paypal
    this.initPayPalSdk();
    this.orderForm = this.formBuilder.group({
      paymentMethod: "",
      deliveryMethod: "",
    });
  }

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
    // this.orderDto.deliveryAddress = this.deliveryAddress;
    // this.orderDto.buyer = this.buyer;

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
          this.paymentStatus = res.status;
          console.log(this.paymentStatus);
        });
      },
      onError: err => {
        console.log('OnError', err);
      },
    };
  }

  getClientTokenFn(): Observable<string> {
    return this.paymentService.retrieveToken();
  }

  createPurchase(nonce: string): Observable<any> {
    const data = { nonce: nonce };
    console.log(data);
    return this.paymentService.createTransaction(nonce);
  }

  onPaymentStatus(response): void {
    console.log(response);
  }
}
