import { TestUser } from './../../shared/models/dtos/test-user';
import { Error, ErrorDetail } from './../../shared/models/dtos/error-detail';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from './../../shared/models/product';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  @ViewChild('focusOn',{static: true}) private elementRef: ElementRef;
  myProductList : Product[];
  stt: number[] ;
  cancelProduct : Product;
  ownerId : number = 1;
  productName : string = "";

  // get productName() {
  //   return this._productName;
  // }

  // set productName(a) {
  //   this._productName = a; 
  // }

  approvementStatusName : string = "";
  currentProductName = "";
  currentApprovementStatusName = "";
  page : number = 0;
  totalPages : number;
  pageSize : number;

  constructor(
    private productService : ProductService
  ) { }

  getColor(approvementStatusName : string) : string {
    switch(approvementStatusName) {
      case "đang chờ duyệt" :
        return "text-warning";
      case "duyệt thành công" :
        return "text-success";
      case "duyệt thất bại" :
        return "text-danger";
      case "đã hủy":
        return "text-secondary";
      default:
        return "";
    }
  }

  setCancelProduct(product : Product) {
      this.cancelProduct = product;
  }

  cancelRegister() {
    this.productService.cancelRegister(this.ownerId,this.productName,this.approvementStatusName,
      this.cancelProduct.id,this.page).subscribe(data => {
        this.myProductList = data.content;
        this.stt = [];
        let firstIndex = this.pageSize*this.page + 1;
        let lastIndeex = this.pageSize*(this.page + 1);
        for (let i = firstIndex; i <= lastIndeex; i++) {
        this.stt.push(i);
      }
      });
  }

  previous() {
    if(this.page > 0) {
      this.page = this.page - 1;
      this.getMyProducts();
    }
  }

  next() {
    if( (this.page + 1) < this.totalPages) {
      this.page = this.page + 1;
      this.getMyProducts();
    }
  }

  search() {
    this.page = 0;
    this.productName = this.currentProductName.trim();
    this.approvementStatusName = this.currentApprovementStatusName.trim();
    this.getMyProducts();
  }

  getMyProducts() {
    this.productService.getMyProducts(this.ownerId,this.productName,this.approvementStatusName,this.page)
    .subscribe(data => {
      if (data != null) {
        this.myProductList = data.content;
        this.totalPages = data.totalPages;
        this.pageSize = data.size;
        this.stt = [];
        let firstIndex = this.pageSize*this.page + 1;
        let lastIndeex = this.pageSize*(this.page + 1);
        for (let i = firstIndex; i <= lastIndeex; i++) {
          this.stt.push(i);
        }
      } else {
        this.myProductList = [];
        this.totalPages = 0;
        this.page = -1;
      }
       
    })
  }

  ngOnInit() {
    this.elementRef.nativeElement.focus();
    this.getMyProducts();
    // this.testError();
  }

  // testError() {
    
  //   this.productService.testError().subscribe((data : TestUser | ErrorDetail) => {

  //     // console.log(data);
  //     if ("id" in data) {
  //       console.log(data)
  //       console.log("có id trong data");
  //     } else if ("timestamp" in data) {
  //       console.log(data)
  //       console.log(" có timestap trong data");
  //     }

  // })
  // }

}
