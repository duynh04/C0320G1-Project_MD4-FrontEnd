import {Component, OnInit} from '@angular/core';
import {FavoriteProduct} from '../../shared/models/favorite-product';
import {ProductService} from '../../shared/services/product.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {

  userId = 2;
  favoriteProducts: FavoriteProduct[];
  page = 0;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getFavoriteProductsByUserId(this.userId).subscribe(value => {
      this.favoriteProducts = value.content;
      this.page = value.pageable.pageNumber;
      console.log(this.favoriteProducts);
      console.log(this.page);
    });
  }

}
