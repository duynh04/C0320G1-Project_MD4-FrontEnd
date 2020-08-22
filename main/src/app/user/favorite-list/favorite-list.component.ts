import { Component, OnInit } from '@angular/core';
import { FavoriteProduct } from '../../shared/models/favorite-product';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FavoriteProductService } from 'src/app/shared/services/favorite-product.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {

  userId: number;
  favoriteProducts: Observable<FavoriteProduct[]>;
  total: number;
  perPage: number;
  page: number;
  pickedItem: FavoriteProduct;
  isEmpty = true;

  constructor(
    private favoriteProductService: FavoriteProductService,
    private token: TokenStorageService) {
    this.userId = this.token.getJwtResponse().userId;
    this.page = 1;
  }

  ngOnInit() {
    this.getPage(this.page);
  }

  getPage(page: number) {
    this.favoriteProducts = this.favoriteProductService.getByUserId(this.userId, page - 1).pipe(
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
    if (this.page > pageBounds) {
      this.getPage(pageBounds);
    }
  }

  pickItem(item: FavoriteProduct) {
    this.pickedItem = item;
  }

  detelePickedItem() {
    if (this.pickedItem) {
      this.favoriteProductService.deleteById(this.pickedItem.id).subscribe(() => {
        this.getPage(this.page);
      });
    }
  }
}
