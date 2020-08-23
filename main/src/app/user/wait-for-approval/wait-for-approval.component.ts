import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from 'src/app/shared/models/product';
import {ProductService} from 'src/app/shared/services/product.service';
import {map, tap} from 'rxjs/operators';
import {TokenStorageService} from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-wait-for-approval',
  templateUrl: './wait-for-approval.component.html',
  styleUrls: ['./wait-for-approval.component.css']
})
export class WaitForApprovalComponent implements OnInit {

  userId: number;
  waitingProducts: Observable<Product[]>;
  total: number;
  perPage: number;
  page: number;
  isEmpty: boolean;

  constructor(
    private productService: ProductService,
    private token: TokenStorageService) {
    this.userId = this.token.getJwtResponse().userId;
    this.isEmpty = true;
    this.page = 1;
  }

  ngOnInit() {
    this.getPage(this.page);
  }

  getPage(page: number) {
    this.waitingProducts = this.productService.getWaitingProducts(this.userId, page - 1).pipe(
      tap(res => {
        this.total = res.totalElements;
        this.perPage = res.size;
        this.page = page;
        this.isEmpty = res.totalElements === 0;
      }),
      map(res => res.content)
    );
  }

}
