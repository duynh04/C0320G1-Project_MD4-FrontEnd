import { Router } from '@angular/router';
import { User } from './../../shared/models/user';
import { DeliveryAddress } from './../../shared/models/delivery-address';
import { OrderDto } from './../../shared/models/dtos/orderDto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IPayPalConfig } from 'ngx-paypal';

import { OrderService } from 'src/app/shared/services/order.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
@Component({
  selector: 'app-payment-option',
  templateUrl: './payment-option.component.html',
  styleUrls: ['./payment-option.component.css'],
})
export class PaymentOptionComponent implements OnInit {
  // Duy
  // paypal config
  public payPalConfig?: IPayPalConfig;
  //
  orderForm: FormGroup;
  payments: any;
  orderDto: OrderDto = new OrderDto();
  paymentMethod: String;
  deliveryMethod: String = 'Giao hàng tiêu chuẩn';

  buyer: User = {
    id: 1,
    fullname: 'Lương',
    email: 'cuong@gmail.com',
    phoneNumber: '0123111222',
    address: 'Da Nang',
    birthday: '1996-11-08',
    idCard: '123123123',
    gender: 'Nam',
    rate: {
      id: 1,
      name: 'kim cương',
    },
    point: 100,
    lastLogin: '2020-08-13T00:00:00',
    status: true,
  };

  deliveryAddress: DeliveryAddress = {
    id: 2,
    nation: 'Viet Nam',
    city: 'Da Nang',
    district: 'Hoa Phuoc',
    ward: 'Hoa Vang',
    street: 'Đường 605',
    phoneNumber: '0123456789',
    isDefault: true,
    user: {
      id: 1,
      // fullname: "Lương",
      // email: "cuong@gmail.com",
      // phoneNumber: "0123111222",
      // address: "Da Nang",
      // birthday: "1996-11-08",
      // idCard: "123123123",
      // gender: "Nam",
      // rate: {
      //   id: 1,
      //   name: "kim cương",
      // },
      // point: 100,
      // lastLogin: "2020-08-13T00:00:00",
      // status: true,
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    // initialize paypal
    this.initPayPalSdk();
    this.orderForm = this.formBuilder.group({
      paymentMethod: '',
      deliveryMethod: '',
    });
  }

  selectPayment(pay) {
    this.payments = pay;
  }

  onSubmit() {
    console.log(this.orderForm.value.paymentMethod);
    this.orderDto.paymentMethod = this.paymentMethod;
    this.orderDto.deliveryMethod = this.deliveryMethod;
    if (this.orderForm.value.paymentMethod == 'Thanh toán trực tiếp') {
      this.orderDto.paymentState = 'Đang chờ thanh toán';
    } else {
      this.orderDto.paymentState = 'Đã thanh toán thành công';
    }
    this.orderDto.deliveryAddress = this.deliveryAddress;
    this.orderDto.buyer = this.buyer;

    this.orderService
      .createOrder(this.orderDto)
      .subscribe(() => this.router.navigate(['payment/order']));
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
