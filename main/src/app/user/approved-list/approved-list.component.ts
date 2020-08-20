import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-approved-list',
  templateUrl: './approved-list.component.html',
  styleUrls: ['./approved-list.component.css']
})
export class ApprovedListComponent implements OnInit {

  userId = 1;
  approvedProducts: Observable<Product[]>;
  total: number;
  perPage: number;
  page = 1;
  pageBounds: number;
  isEmpty = true;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getPage(this.page);
  }

  getPage(page: number) {
    this.approvedProducts = this.productService.getApprovedProducts(this.userId, page - 1).pipe(
      tap(res => {
        this.total = res.totalElements;
        this.perPage = res.size;
        this.page = page;
        this.isEmpty = res.totalElements === 0;
      }),
      map(res => res.content)
    );
  }

  pageBoundsChanged(pageBounds: number) {
    this.pageBounds = pageBounds;
  }

}
