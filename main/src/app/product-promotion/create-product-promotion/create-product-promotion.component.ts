import { Component, OnInit } from '@angular/core';


import {ActivatedRoute, Router} from '@angular/router';

import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductPromotionService} from '../../shared/services/product-promotion.service';
import {Product} from '../../shared/models/product';
import {MatDialog} from '@angular/material';
import {CommitSendMailComponent} from '../commit-send-mail/commit-send-mail.component';


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

function checkDate(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value !== undefined && (isNaN(control.value) || control.value < Date.now())) {
    return { dateInvalid: true };
  }
  return null;
}

function checkEndDate(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value !== undefined && (isNaN(control.value) || control.value < Date.now())) {
    return { endDateInvalid: true };
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
  usersEmail;
  id: number;
  start = new Date(2020, 1, 1);
  private startDayCheck: Date;
  private timeValidate: boolean;
  private currentDay: Date;
  private endDayCheck: Date;

  constructor(private productPromotionService: ProductPromotionService,
              private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.currentDay = new Date(Date.now());
    console.log(this.currentDay);
    this.reloadData();
    this.formAddNewPromotion = this.formBuilder.group({
      idProduct: [null, [Validators.required]],
      content: [''],
      startDate: ['', [Validators.required, checkDate]],
      endDate: ['', [Validators.required, checkEndDate]],
      percent: [null, [ Validators.required, checkPercent]],
      price: [null, [ Validators.required, checkPrice]],
    },
    );
  }

  reloadData() {
    this.productPromotionService.getProductList().subscribe((data: Product[]) => {
      this.products = data;
    });
    this.productPromotionService.getUserList().subscribe(data => {
      this.usersEmail = data;
    });
  }

  save() {
      this.productPromotionService.createProductPromotion(this.formAddNewPromotion.value).subscribe(data => {
    });
      const dialogRef = this.dialog.open(CommitSendMailComponent, {
      width: '510px',
      height: '240px',
        data: {length: this.usersEmail.length,
              name: this.products[this.formAddNewPromotion.controls.idProduct.value].name
        },
      disableClose: true,
    });

      dialogRef.afterClosed().subscribe(result => {
      this.gotoList();
    });
  }

  onSubmit() {
    this.save();
  }

  gotoList() {
    this.router.navigateByUrl('/productPromotion');
  }

  checkValidateTimeInput(a: Date, b: Date) {
    this.timeValidate = false;
    if (a == null || b == null) {
      return 0;
    }
    if (a.getTime() > b.getTime()) {
      this.timeValidate = true;
    } else {
      this.timeValidate = false;
    }
  }
}
