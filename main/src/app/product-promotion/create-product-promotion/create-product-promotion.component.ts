import { Component, OnInit } from '@angular/core';


import {ActivatedRoute, Router} from '@angular/router';

import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductPromotionService} from '../../shared/services/product-promotion.service';
import {ProductService} from '../../shared/services/product.service';
import {Product} from '../../shared/models/product';
declare let Email: any;

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
  selector: 'app-create-product-promotion',
  templateUrl: './create-product-promotion.component.html',
  styleUrls: ['./create-product-promotion.component.css']
})
export class CreateProductPromotionComponent implements OnInit {

  formAddNewPromotion: FormGroup;
  products: Product[];
  startDate: any;
  id: number;



  constructor(private productPromotionService: ProductPromotionService,
              private productService: ProductService,
              private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.reloadData();
    this.formAddNewPromotion = this.formBuilder.group({
      idProduct: [null, [Validators.required]],
      content: [''],
      startDate: [''],
      endDate: [''],
      percent: [null, [ Validators.required, checkPercent]],
      price: [null, [ Validators.required, checkPrice]],
    },
    );
  }

  reloadData() {
    this.productService.getProductList().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  save() {
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'thong220700@gmail.com',
      Password: 'EB79B477DC0EAD8F1B62D27C2019ADAD8B0C',
      To: 'thong22072000@gmail.com',
      From: 'thong220700@gmail.com',
      Subject: 'test mail',
      // tslint:disable-next-line:max-line-length
      Body: 'qdasdsadasdasdas'
    }).then(message => {
      alert('gửi mail');
    });
    this.productPromotionService.createProductPromotion(this.formAddNewPromotion.value).subscribe(data => {
      this.router.navigateByUrl('');
    });
  }

  onSubmit() {
    this.save();
  }

  gotoList() {
    this.router.navigateByUrl('productPromotions');
  }

}
