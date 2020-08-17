import { Component, OnInit } from '@angular/core';
import { AuctionProductService } from '../services/auction-product.service';

@Component({
  selector: 'app-auction-product',
  templateUrl: './auction-product.component.html',
  styleUrls: ['./auction-product.component.css']
})
export class AuctionProductComponent implements OnInit {
  public auctionProducts;

  constructor(
    public auctionProductService: AuctionProductService
  ) { }

  ngOnInit() {
  }

}
