import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-product-discount',
  templateUrl: './product-discount.component.html',
  styleUrls: ['./product-discount.component.css']
})
export class ProductDiscountComponent implements OnInit {
  percent: string;
  content: string;
  saleDate: string;
  endOfEvent: string;
  products: Product[];
  public formSearch: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public service: ProductService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.formSearch = this.formBuilder.group({
      content: ['', [Validators.required]],
      saleDate: ['', [Validators.required, Validators.pattern('^(0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01])[-][0-9]{4}$')]],
      endOfEvent: ['', [Validators.required, Validators.pattern('^(0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01])[-][0-9]{4}$')]],
      percent: ['', [Validators.required]],
    });
  }

  sendDetails() {
    console.log(this.formSearch.value);
    this.content = this.formSearch.controls.content.value;
    this.saleDate = this.formSearch.controls.saleDate.value;
    this.endOfEvent = this.formSearch.controls.endOfEvent.value;
    this.percent = this.formSearch.controls.percent.value;
    this.service.searchProduct(this.content, this.saleDate, this.endOfEvent, this.percent).subscribe(data => {
      this.products = data;
    });
  }
}
