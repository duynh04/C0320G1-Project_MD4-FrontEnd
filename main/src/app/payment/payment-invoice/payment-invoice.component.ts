import { OrderAddressInfo } from './../../shared/models/dtos/delivery-adddress-dto';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartDetail } from './../../shared/models/cart-detail';
import { Order } from './../../shared/models/order';
import { Component, OnInit } from '@angular/core';
import {printPdf} from 'src/assets/javascript/generate-pdf'

@Component({
  selector: 'app-payment-invoice',
  templateUrl: './payment-invoice.component.html',
  styleUrls: ['./payment-invoice.component.css']
})
export class PaymentInvoiceComponent implements OnInit {
  deliveryPrice = 0;
  order : Order ={
    id :null,
    code : null,
    buyer: {
      id: null,
      fullname: null,
      email: null,
      phoneNumber: null,
      address: null,
      birthday: null,
      idCard: null,
      gender: null,
      rate: null,
      point: null,
      lastLogin: null,
      status: null
    },
    status: null,
    paymentMethod: null,
    deadlineDelivery: null,
    deliveryAddress: null,
    deliveryMethod: null,
    cart: {
      id: null,
      totalPrice: null,
      status: null,
      user: null,
      cartDetails: null
    },
    paymentStatus: null
  }
  deliveryAddress: OrderAddressInfo;
  cartDetail: CartDetail[] = [];
  constructor(private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router) { }

  ngOnInit() {
    printPdf();
    this.activatedRoute.paramMap.subscribe(data=>{
      this.paymentService.findInvoiceById(data.get('id')).subscribe(data=>{
        this.cartDetail = data['cartDetail'];
        this.order = data['order'];
        if(this.order.deliveryMethod="Giao hàng tiêu chuẩn"){
          this.deliveryPrice = 50000;
        }else{
          this.deliveryPrice = 100000;
        }
        this.deliveryAddress = this.paymentService.addressInfo;
      })
    })
  }
  backToHomePage() {
    this.router.navigateByUrl("/home");
  }

}
