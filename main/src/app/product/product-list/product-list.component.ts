import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Product} from '../../shared/models/product';
import {ProductService} from '../../shared/services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private formSearchList: FormGroup;

  products: Observable<Product[]>;

  constructor(private productServices: ProductService,
              private router: Router,
              public formBuilder: FormBuilder ) {}

  reloadData() {
    this.products = this.productServices.getProductList();
  }

  ngOnInit() {
    this.formSearchList = this.formBuilder.group({
      name: ['', [ Validators.pattern('^[A-Za-z0-9]{0,}$')]],
      owner: ['', [ Validators.pattern('^[A-Za-z0-9]{0,}$')]]
    });

    this.reloadData();
  }

}
