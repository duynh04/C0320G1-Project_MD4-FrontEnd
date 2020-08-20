import { Product } from './../../shared/models/product';
import { DeliveryAddress } from './../../shared/models/delivery-address';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartDetail } from './../../shared/models/cart-detail';
import { User } from './../../shared/models/user';
import { Order } from './../../shared/models/order';
import { Component, OnInit } from '@angular/core';
import { Auction } from 'src/app/shared/models/auction';
import { printPdf } from 'src/assets/javascript/generate-pdf'

@Component({
  selector: 'app-payment-invoice',
  templateUrl: './payment-invoice.component.html',
  styleUrls: ['./payment-invoice.component.css']
})
export class PaymentInvoiceComponent implements OnInit {
  order = {
    id: null,
    code: null,
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
    // deliveryAddress: {
    //   id: 1,

    // },
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
  cartDetail: CartDetail[] = [];
  constructor(private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router) { }

  ngOnInit() {
    console.log(printPdf());
    this.activatedRoute.paramMap.subscribe(data => {
      this.paymentService.findInvoiceById(data.get('id')).subscribe(data => {
        this.cartDetail = data['cartDetail'];
        this.order = data['order'];
      })
    })
  }
  backToHomePage() {
    this.router.navigateByUrl("/home");
  }

}
