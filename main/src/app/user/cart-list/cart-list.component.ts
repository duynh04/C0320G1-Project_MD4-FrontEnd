import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { Cart } from '../../shared/models/cart';
import { CartDetail } from '../../shared/models/cart-detail';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  cart: Cart;
  cartDetails: CartDetail[];
  totalCost = 0;
  userId = 1; // userId mẫu để test
  deleteIndex: number;

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getCart(this.userId);
  }

  getCart(userId: number): void {
    this.cartService.getCart(userId).subscribe((value) => {
      this.cart = value;
      this.cartDetails = value.cartDetails;
      this.totalCost = value.totalPrice;
      console.log(this.cartDetails[0]);
    });
  }

  updateTotalCost() {
    this.cartService.updateTotalCost(this.cart.id).subscribe((value) => {
      this.totalCost = value;
    });
  }

  increaseQty(i: number): void {
    const cartDetailId = this.cartDetails[i].id;
    const currentQuantity = this.cartDetails[i].productQuantity;
    this.cartService.updateItem(cartDetailId, currentQuantity + 1).subscribe(() => {
      this.cartDetails[i].productQuantity = currentQuantity + 1;
      this.updateTotalCost();
    });
  }

  decreaseQty(i: number): void {
    const cartDetailId = this.cartDetails[i].id;
    const currentQuantity = this.cartDetails[i].productQuantity;
    this.cartService.updateItem(cartDetailId, currentQuantity - 1).subscribe(value => {
      this.cartDetails[i].productQuantity = currentQuantity - 1;
      this.updateTotalCost();
    });
  }

  pickDeletedIndex(i: number): void {
    this.deleteIndex = i;
  }

  deleteItem() {
    this.cartService.deleteItem(this.cartDetails[this.deleteIndex].id).subscribe(value => {
      this.cartDetails = this.cartDetails.filter((_, index) => index !== this.deleteIndex);
      this.updateTotalCost();
    });
  }

  goToPayment() {
    // this.cartService.updateTotalCost(this.cart.id).subscribe(() => {
    this.router.navigate(['payment']);
    // });
  }
}
