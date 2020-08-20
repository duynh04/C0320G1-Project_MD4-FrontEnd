import { Component, OnInit } from '@angular/core';
import { FavoriteProduct } from '../../shared/models/favorite-product';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FavoriteProductService } from 'src/app/shared/services/favorite-product.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {

  userId = 2;
  favoriteProducts: Observable<FavoriteProduct[]>;
  total: number;
  perPage: number;
  page = 1;
  pickedItem: FavoriteProduct;
  pageBounds: number;
  isEmpty = true;

  constructor(private favoriteProductService: FavoriteProductService) {
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
    this.pageBounds = pageBounds;
  }

  pickItem(item: FavoriteProduct) {
    this.pickedItem = item;
  }

  detelePickedItem() {
    if (this.pickedItem) {
      this.favoriteProductService.deleteById(this.pickedItem.id).subscribe(() => {
        if (this.page <= this.pageBounds) {
          this.getPage(this.page);
        } else {
          this.getPage(this.pageBounds);
        }
      });
    }
  }
}
