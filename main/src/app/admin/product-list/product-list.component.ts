import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../shared/models/product';
import {ProductSearchDTO} from '../../shared/models/dtos/productSearchDTO';
import {Observable, Subscription} from 'rxjs';
import {AdminService} from '../../shared/services/admin.service';
import {map, tap} from 'rxjs/operators';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private formSearchList: FormGroup;
  productList: Observable<Product[]>;
  stt: number[] = [];
  private arrayIdToDelete: number[] = [];
  private checkbox: any;
  private interval: any;
  private priceSearch: string[] = ['0', '100000', '500000', '1000000', '5000000', 'max'];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  isEmpty = false;

  private searchFields: ProductSearchDTO = {} as ProductSearchDTO;

  private subscription: Subscription = new Subscription();

  constructor(private adminService: AdminService,
              public formBuilder: FormBuilder) {
  }


  ngOnInit() {
    this.formSearchList = this.formBuilder.group({
      name: ['', [Validators.pattern('^[a-zA-Z0-9\\ ]*$')]],
      owner: ['', [Validators.pattern('^[a-zA-Z0-9\\ ]*$')]],
      category: [''],
      price: [''],
      status: ['']
    });
    this.getPage(1);

  }

  search() {
    this.searchFields = this.formSearchList.value as ProductSearchDTO;
    switch (this.formSearchList.get('price').value) {
      case '0':
        this.searchFields.minPrice = this.priceSearch[0];
        this.searchFields.maxPrice = this.priceSearch[1];
        break;
      case '1':
        this.searchFields.minPrice = this.priceSearch[1];
        this.searchFields.maxPrice = this.priceSearch[2];
        break;
      case '2':
        this.searchFields.minPrice = this.priceSearch[2];
        this.searchFields.maxPrice = this.priceSearch[3];
        break;
      case '3':
        this.searchFields.minPrice = this.priceSearch[3];
        this.searchFields.maxPrice = this.priceSearch[4];
        break;
      case '4':
        this.searchFields.minPrice = this.priceSearch[4];
        this.searchFields.maxPrice = this.priceSearch[5];
        break;
      default:
        this.searchFields.minPrice = '';
        this.searchFields.maxPrice = '';
    }
    console.log(this.searchFields);
    this.getPage(1);
  }

  // Thành Long
  // delete product
  deleteProducts() {
    this.arrayIdToDelete = [];
    this.checkbox = document.getElementsByClassName('checkthis');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.checkbox.length; i++) {
      if (this.checkbox[i].checked) {
        this.arrayIdToDelete.push(Number(this.checkbox[i].defaultValue));
      }
    }
    this.adminService.deleteProducts(this.arrayIdToDelete)
      .subscribe(data => {
        this.interval = setInterval(() => {
          this.stopReload();
        }, 100);
      });
    window.location.reload();
  }
  // Thành Long
  stopReload() {
    this.subscription.unsubscribe();
    clearInterval(this.interval);
  }

  // Thành Long
  getPage(pageNumber) {
    this.productList = this.adminService.getProduct(this.searchFields, pageNumber).pipe(
      tap(res => {
        console.log(res);
        this.totalElements = res.totalElements;
        this.pageSize = res.size;
        this.currentPage = pageNumber;

        this.stt = [];
        const firstIndex = this.pageSize * (this.currentPage - 1) + 1;
        const lastIndeex = this.pageSize * this.currentPage;
        for (let i = firstIndex; i <= lastIndeex; i++) {
          this.stt.push(i);
        }

        this.isEmpty = false;
        if (res.content.length == 0) {
          this.isEmpty = true;
        }
      }, error => {
        console.log(error);
        console.log('vào được err của tap');
      }),
      map(res => res.content)
    );
  }
}
