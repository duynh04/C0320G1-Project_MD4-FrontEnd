import { User } from "./../../shared/models/user";
import { DeliveryAddress } from "./../../shared/models/delivery-address";
import { OrderDto } from "./../../shared/models/dtos/orderDto";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

import { OrderService } from "src/app/shared/services/order.service";
@Component({
  selector: "app-payment-option",
  templateUrl: "./payment-option.component.html",
  styleUrls: ["./payment-option.component.css"],
})
export class PaymentOptionComponent implements OnInit {
  orderForm: FormGroup;
  payments: any;
  orderDto: OrderDto = new OrderDto();

  buyer: User = {
    id: 1,
    fullname: "Lương",
    email: "cuong@gmail.com",
    phoneNumber: "0123111222",
    address: "Da Nang",
    birthday: "1996-11-08",
    idCard: "123123123",
    gender: "Nam",
    rate: {
      id: 1,
      name: "kim cương",
    },
    point: 100,
    lastLogin: "2020-08-13T00:00:00",
    status: true,
  };

  deliveryAddress: DeliveryAddress = {
    id: 2,
    nation: "Viet Nam",
    city: "Da Nang",
    district: "Hoa Phuoc",
    ward: "Hoa Vang",
    street: "Đường 605",
    phoneNumber: "0123456789",
    isDefault: true,
    user: {
      id: 1,
      fullname: "Lương",
      email: "cuong@gmail.com",
      phoneNumber: "0123111222",
      address: "Da Nang",
      birthday: "1996-11-08",
      idCard: "123123123",
      gender: "Nam",
      rate: {
        id: 1,
        name: "kim cương",
      },
      point: 100,
      lastLogin: "2020-08-13T00:00:00",
      status: true,
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService
  ) {}

  ngOnInit() {
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
    this.orderDto.paymentMethod = this.orderForm.value.paymentMethod;
    this.orderDto.deliveryMethod = this.orderForm.value.deliveryMethod;
    if (this.orderForm.value.paymentMethod == "Thanh toán trực tiếp") {
      this.orderDto.paymentState = "Đang chờ thanh toán";
    } else {
      this.orderDto.paymentState = "Đã thanh toán thành công";
    }
    this.orderDto.deliveryAddress = this.deliveryAddress;
    this.orderDto.buyer = this.buyer;

    this.orderService.createOrder(this.orderDto).subscribe();
  }
}
