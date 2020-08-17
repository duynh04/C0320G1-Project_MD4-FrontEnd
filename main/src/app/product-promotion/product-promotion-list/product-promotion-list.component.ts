import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';

import {Router} from '@angular/router';
import {ProductPromotion} from '../../shared/models/ProductPromotion';
import {Product} from '../../shared/models/product';
import {ProductService} from '../../shared/services/product.service';
import {ProductPromotionService} from '../../shared/services/product-promotion.service';

@Component({
  selector: 'app-product-promotion-list',
  templateUrl: './product-promotion-list.component.html',
  styleUrls: ['./product-promotion-list.component.css']
})
export class ProductPromotionListComponent implements OnInit {
  productPromotions: ProductPromotion[];
  products: Product[];
  idProduct: number;
  private mapProduct = new Map();
  private mapProductPromotion = new Map();

  constructor(private productPromotionService: ProductPromotionService,
              private productService: ProductService,
              private router: Router,
  ) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.productPromotionService.getProductPromotionList().subscribe((data: ProductPromotion[])  => {{
      this.productPromotions = data;
      this.productPromotions.forEach(element => {
        this.productPromotionService.getProductPromotionDto(element.id).subscribe(data1 => {
          this.idProduct = data1.idProduct;
          this.mapProductPromotion.set(element.id, this.idProduct);
        });
      });
    }});
    // this.productService.getProductList().subscribe((data: Product[]) => {{
    //   this.products = data;
    //   this.products.forEach(element => {
    //     this.mapProduct.set(element.id, element.name);
    //   });
    // }});
  }

  deleteProductPromotion(id: number) {
    this.productPromotionService.deleteProductPromotion(id)
      .subscribe(
        data => {
          this.reloadData();
        },
        error => console.log(error));
  }
  // openDialogDeletePromotion(id) {
  //   this.productPromotionService.getProductPromotion(id).subscribe(dataOfPromotion => {
  //     const dialogRef = this.dialog.open(DeleteProductPromotionComponent, {
  //       width: '500px',
  //       height: '200px',
  //       data: {data1: dataOfPromotion},
  //       disableClose: true,
  //     });
  //
  //     dialogRef.afterClosed().subscribe(result => {
  //       this.ngOnInit();
  //     });
  //   });
  // }

  updateProductPromotion(id: number) {
    this.router.navigate(['promotion/update', id]);
  }
}
