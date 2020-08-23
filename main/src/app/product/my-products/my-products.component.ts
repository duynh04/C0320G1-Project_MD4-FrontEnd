import { Product } from '../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  myProductList: Product[];
  stt: number[] = [];
  cancelProduct: Product;
  ownerId = 1;
  productName = '';
  approvementStatusName = '';
  page = 0;
  totalPages: number;
  pageSize: number;

  constructor(
    private productService: ProductService
  ) { }

  getColor(approvementStatusName: string): string {
    switch (approvementStatusName) {
      case 'đang chờ duyệt' :
        return 'text-warning';
      case 'duyệt thành công' :
        return 'text-success';
      case 'duyệt thất bại' :
        return 'text-danger';
      case 'đã hủy':
        return 'text-secondary';
      default:
        return '';
    }
  }

  setCancelProduct(product: Product) {
      this.cancelProduct = product;
  }

  // cancelRegister() {
  //   this.productService.cancelRegister(this.ownerId, this.productName, this.approvementStatusName,
  //     this.cancelProduct.id, this.page).subscribe(data => {
  //       this.myProductList = data.content;
  //       this.stt = [];
  //       const firstIndex = this.pageSize * this.page + 1;
  //       const lastIndeex = this.pageSize * (this.page + 1);
  //       for (let i = firstIndex; i <= lastIndeex; i++) {
  //       this.stt.push(i);
  //     }
  //     });
  // }

  previous() {
    if (this.page > 0) {
      this.page = this.page - 1;
      this.ngOnInit();
    }
  }

  next() {
    if ( (this.page + 1) < this.totalPages) {
      this.page = this.page + 1;
      this.ngOnInit();
    }
  }

  search() {
    this.page = 0;
    this.ngOnInit();
  }

  ngOnInit() {
    // this.productService.getMyProducts(this.ownerId, this.productName, this.approvementStatusName, this.page)
    // .subscribe(data => {
    //   this.myProductList = data.content;
    //   this.totalPages = data.totalPages;
    //   this.pageSize = data.size;
    //   this.stt = [];
    //   const firstIndex = this.pageSize * this.page + 1;
    //   const lastIndeex = this.pageSize * (this.page + 1);
    //   for (let i = firstIndex; i <= lastIndeex; i++) {
    //     this.stt.push(i);
    //   }
    // });
  }

}
