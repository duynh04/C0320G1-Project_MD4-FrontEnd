import { Router } from "@angular/router";
import { OrderDto } from "./../../shared/models/dtos/orderDto";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { IPayPalConfig } from 'ngx-paypal';
import { OrderService } from "src/app/shared/services/order.service";
import { PaymentService } from 'src/app/shared/services/payment.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Observable } from 'rxjs';
@Component({
  selector: "app-payment-option",
  templateUrl: "./payment-option.component.html",
  styleUrls: ["./payment-option.component.css"],
})

//creator: Đặng Hồng Quân team C
export class PaymentOptionComponent implements OnInit {

  // Duy 
  //paypal config
  payPalConfig?: IPayPalConfig;
  //
  orderForm: FormGroup;
  payments: any;
  orderDto: OrderDto = new OrderDto();
  paymentMethod: String;
  deliveryMethod: String = "Giao hàng tiêu chuẩn";
  deliveryAddress: String = "da nang"
  paymentStatus = "Fail";

  constructor(
    private orderService: OrderService,
    private router: Router,
    private paymentService: PaymentService,
    private tokenStorageService: TokenStorageService
  ) { };



  ngOnInit() {
    // initialize paypal
    this.initPayPalSdk();
    console.log(this.tokenStorageService.getUsername())
    this.tokenStorageService.getAuthorities()
  };


  selectPayment(pay) {
    this.payments = pay;
  }

  onSubmit() {

    this.orderDto.paymentMethod = this.paymentMethod;
    this.orderDto.deliveryMethod = this.deliveryMethod;
    if (this.paymentMethod == "Thanh toán trực tiếp") {
      this.orderDto.paymentState = "Đang chờ thanh toán";
    } else {
      this.orderDto.paymentState = "Đã thanh toán thành công";
    }
    this.orderDto.deliveryAddress = this.deliveryAddress;

    this.orderDto.buyer = { id: this.tokenStorageService.getUser().userId }
    console.log(this.paymentStatus)
    // this.orderService
    //   .createOrder(this.orderDto)
    //   .subscribe(() => this.router.navigate(["payment/order"]));
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
      onCancel: (cancel) => {
        this.paymentStatus = "Fail"
      }
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
    if (response.status != undefined) {
      this.paymentStatus = "Success";
      console.log(response.status);
    } else {
      this.paymentStatus = "Fail";
      console.log(response.message);
    }
  }
}
