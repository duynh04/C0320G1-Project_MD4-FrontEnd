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
  // orderDto: OrderDto = new OrderDto();
  paymentMethod: string;
  deliveryMethod: string = "Giao hàng tiêu chuẩn";
  deliveryAddress: string = "da nang"
  paymentStatus = "Fail";

  result: string = "";
  cssResult: string = "";

  constructor(
    private orderService: OrderService,
    private router: Router,
    private paymentService: PaymentService,
    private tokenStorageService: TokenStorageService
  ) { }



  ngOnInit() {
    // initialize paypal
    this.initPayPalSdk();
    console.log(this.tokenStorageService.getUsername())
    this.tokenStorageService.getAuthorities()
    this.deliveryAddress = this.paymentService.addressInfo.street + ', '
      + this.paymentService.addressInfo.ward + ', '
      + this.paymentService.addressInfo.district + ', '
      + this.paymentService.addressInfo.city + '.'
  };


  selectPayment(pay) {
    this.payments = pay;
    if (pay == "TT") {
      this.paymentStatus = "Success"
    } else {
      this.paymentStatus = "Fail"
    }
  }

  onSubmit() {
    const orderDto = {} as OrderDto
    orderDto.paymentMethod = this.paymentMethod;
    orderDto.deliveryMethod = this.deliveryMethod;
    if (this.paymentMethod == "Thanh toán trực tiếp") {
      orderDto.paymentState = "Đang chờ thanh toán";
    } else {
      orderDto.paymentState = "Đã thanh toán thành công";
    }
    orderDto.deliveryAddress = this.deliveryAddress;

    // this.orderDto.buyer = { id: this.tokenStorageService.getUser().userId }
    console.log(orderDto)
    console.log(this.paymentStatus)
    this.orderService
      .createOrder(orderDto)
      .subscribe(() => this.router.navigate(["payment/order"]));
  }

  private initPayPalSdk(): void {
    this.payPalConfig = {
      clientId: 'AbCzPUUevBpwehD2HBR8Y0_ic2rt8ldWn-y_nn7SgR04TvK3r9tLU9MZonzGDnXTq5exF5hlhdll6wMp',
      style: {
        layout: 'horizontal'
      },
      createOrderOnServer: (data: any) => {
        return this.paymentService.setPayPalTransaction(this.deliveryMethod).toPromise().then(res => {
          // console.log(res);
          this.paymentService.captureOrder = res;
          return res.id;
        });
      },
      onApprove: (data) => {
        this.paymentService.confirmPayPalTransaction(data.orderID).subscribe(res => {
          this.paymentStatus = res.status;
          if (this.paymentStatus == "COMPLETED") {
            this.result = "Thanh toán thành công.";
            this.cssResult = "text-success";
          } else {
            this.result = "Thanh toán thất bại. Hãy thử lại.";
            this.cssResult = "text-danger";
          }
        });
      },
      onError: err => {
        console.log('OnError', err);
      },
      onCancel: (cancel) => {
        this.paymentStatus = "Fail"
        this.result = "Thanh toán thất bại. Hãy thử lại.";
        this.cssResult = "text-danger";
      }
    };
  }

  getClientTokenFn(): Observable<string> {
    return this.paymentService.retrieveVisaToken();
  }

  createPurchase(nonce: string): Observable<any> {
    const data = { nonce: nonce };
    console.log(data);
    return this.paymentService.createVisaTransaction(nonce, this.deliveryMethod);
  }

  onPaymentStatus(response): void {
    if (response.status != undefined) {
      this.paymentStatus = "Success";
      this.result = "Thanh toán thành công.";
      this.cssResult = "text-success";
    } else {
      this.paymentStatus = "Fail";
      this.result = "Thanh toán thất bại. Hãy thử lại.";
      this.cssResult = "text-danger";
    }
  }
}
