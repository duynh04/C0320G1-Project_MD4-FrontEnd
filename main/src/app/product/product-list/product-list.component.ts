import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../shared/models/product';
import {ProductService} from '../../shared/services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private formSearchList: FormGroup;
  productList: Product[];
  stt: number[] = [];
  fullName = '';
  page = 0;
  totalPages: number;
  pageSize: number;


  constructor(private productService: ProductService,
              public formBuilder: FormBuilder) {
  }


  ngOnInit() {
    this.formSearchList = this.formBuilder.group({
      name: ['', [Validators.pattern('^[A-Za-z0-9]{0,}$')]],
      owner: ['', [Validators.pattern('^[A-Za-z0-9]{0,}$')]]
    });
    // tslint:disable-next-line:max-line-length
    this.productService.getProduct(this.page).subscribe(data => {
      this.productList = data.content;
      this.totalPages = data.totalPages;
      this.pageSize = data.size;
      this.stt = [];
      let firstIndex = this.pageSize * this.page + 1;
      let lastIndeex = this.pageSize * (this.page + 1);
      for (let i = firstIndex; i <= lastIndeex; i++) {
        this.stt.push(i);
      }
    });
  }

  previous() {
    if (this.page > 0) {
      this.page = this.page - 1;
      this.ngOnInit();
    }
  }

  next() {
    if ((this.page + 1) < this.totalPages) {
      this.page = this.page + 1;
      this.ngOnInit();
    }
  }

  search() {
    this.page = 0;
    this.ngOnInit();
  }
}
