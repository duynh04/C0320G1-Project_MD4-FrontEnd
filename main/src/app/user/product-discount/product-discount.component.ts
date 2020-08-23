import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Router} from '@angular/router';
import {ProductPromotionService} from '../../shared/services/productPromotion.service';


@Component({
  selector: 'app-product-discount',
  templateUrl: './product-discount.component.html',
  styleUrls: ['./product-discount.component.css']
})
export class ProductDiscountComponent implements OnInit {
  public ProductPromotion;
  percent: string;
  content: string;
  endOfEvent: string;
  total: number;
  // page: number;
  public formSearch: FormGroup;
  isEmpty: true;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductPromotionService,
    private router: Router,
  ) {
    // this.page = 1;
  }

  ngOnInit() {
    this.service.getAllProduct().subscribe(data => {
      console.log(data);
      this.ProductPromotion = data;
      // this.total = data.content.length;
    });
    this.formSearch = this.formBuilder.group({
      content: ['', [Validators.required]],
      endOfEvent: ['', [Validators.required, Validators.pattern('^[0-9]{4}[-](0?[1-9]|[12][0-9]|3[01])[-](0?[1-9]|1[012])$')]],
      percent: ['', [Validators.required]],
    });
  }

  sendDetails() {
    console.log(this.formSearch.value);
    this.content = this.formSearch.controls.content.value;
    this.endOfEvent = this.formSearch.controls.endOfEvent.value;
    this.percent = this.formSearch.controls.percent.value;
    this.service.searchProduct(this.content, this.endOfEvent, this.percent).subscribe(data => {
      this.ProductPromotion = data;
    });
  }

  clearSearch() {
    this.ngOnInit();
  }

}
