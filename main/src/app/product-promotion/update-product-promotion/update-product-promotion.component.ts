import { Component, OnInit } from '@angular/core';

import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductPromotionService} from '../../shared/services/product-promotion.service';
import {ProductService} from '../../shared/services/product.service';
import {Product} from '../../shared/models/product';
import {ProductPromotion} from '../../shared/models/ProductPromotion';

// creator : đưc Thông
function checkPrice(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value !== undefined && (isNaN(control.value) || control.value < 0 || control.value > 1000000000000)) {
    return { priceInvalid: true };
  }
  return null;
}
function checkPercent(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value !== undefined && (isNaN(control.value) || control.value < 0 || control.value > 100)) {
    return { percentInvalid: true };
  }
  return null;
}

@Component({
  selector: 'app-update-product-promotion',
  templateUrl: './update-product-promotion.component.html',
  styleUrls: ['./update-product-promotion.component.css']
})
export class UpdateProductPromotionComponent implements OnInit {

  id: number;
  public formEditPromotion: FormGroup;
  products: Product[];

  constructor(
              public activatedRoute: ActivatedRoute,
              public formBuilder: FormBuilder,
              private router: Router,
              private productPromotionService: ProductPromotionService,
              private productService: ProductService
  ) { }

  ngOnInit() {
    this.reloadData();
    this.formEditPromotion = this.formBuilder.group({
      idProduct: [null, [Validators.required]],
      content: [''],
      startDate: [''],
      endDate: [''],
      percent: [null, [ Validators.required, checkPercent]],
      price: [null, [ Validators.required, checkPrice]],
    });

    this.activatedRoute.params.subscribe(data => {
      this.id = data.id;
      // tslint:disable-next-line:no-shadowed-variable
      this.productPromotionService.getProductPromotionDto(this.id).subscribe(data => {
        this.formEditPromotion.patchValue(data);
      });
    });
  }

  reloadData() {
    this.productService.getProductList().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  updatePromotion() {
    this.productPromotionService.updateProductPromotion(this.id, this.formEditPromotion.value).subscribe((data: ProductPromotion) => {
      this.router.navigateByUrl('');
    });
  }

  onSubmit() {
    this.updatePromotion();
  }

  gotoList() {
    this.router.navigateByUrl('/productPromotions');
  }
}
