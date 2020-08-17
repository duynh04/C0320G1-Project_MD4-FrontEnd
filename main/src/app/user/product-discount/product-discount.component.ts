import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';


@Component({
  selector: 'app-product-discount',
  templateUrl: './product-discount.component.html',
  styleUrls: ['./product-discount.component.css']
})
export class ProductDiscountComponent implements OnInit {
  percent: any;
  content: any;
  saleDate: any;
  endOfEvent: any;
  products: Product[];

  constructor() { }

  ngOnInit() {
  }

  sendDetails() {

  }
}
