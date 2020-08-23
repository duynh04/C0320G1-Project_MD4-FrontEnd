import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from './../../shared/models/product';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { tap, map, subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  @ViewChild('focusOn',{static: true}) private elementRef: ElementRef;
  myProductList: Observable<Product[]>;
  stt: number[] ;
  cancelProduct : Product;
  ownerId : number;
  productName : string = "";
  approvementStatusName : string = "";
  currentProductName = "";
  currentApprovementStatusName = "";
  currentPage : number;
  pageSize : number;
  totalElements : number;
  isEmpty : boolean = false;

  constructor(
    private productService : ProductService,
    private router : Router,
    private tokenStorageService : TokenStorageService,
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
    this.myProductList = this.productService.cancelRegister(this.ownerId,this.productName,this.approvementStatusName,
      this.cancelProduct.id,this.currentPage - 1).pipe(
        map(res => res.content)
      )
  }

  search() {
    this.productName = this.currentProductName.trim();
    this.approvementStatusName = this.currentApprovementStatusName.trim();
    this.getPage(1);
  }

  test() {
    this.productService.getMyProducts(this.ownerId,this.productName,this.approvementStatusName,0).subscribe(data => {
      console.log("vào được next");
      console.log(data);
    },error => {
      console.log(error);
      console.log("vào được error của subscribe")
    })
  }

  getPage(pageNumber: number) {
    this.myProductList = this.productService.getMyProducts(this.ownerId,this.productName,this.approvementStatusName,pageNumber - 1).pipe(
      tap(res => {
        console.log(res)
        this.totalElements = res.totalElements;
        this.pageSize = res.size;
        this.currentPage = pageNumber;

        this.stt = [];
        let firstIndex = this.pageSize*(this.currentPage - 1) + 1;
        let lastIndeex = this.pageSize*this.currentPage;
        for (let i = firstIndex; i <= lastIndeex; i++) {
          this.stt.push(i);
        }

        this.isEmpty = false;
        if (res.content.length == 0) {
          this.isEmpty = true;
        }
      },error => {
        console.log(error);
        console.log("vào được err của tap");
      }),
      map(res => res),map(res => res.content)
    );
  }


  ngOnInit() {
    this.elementRef.nativeElement.focus();
    this.ownerId = this.tokenStorageService.getJwtResponse().userId;
    this.getPage(1);
    // this.test();
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
