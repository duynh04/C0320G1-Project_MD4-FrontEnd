import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { UserService } from '../../shared/services/user.service';
import { AuctionService } from '../../shared/services/auction.service';
import { AuctionRecordService } from '../../shared/services/auction-record.service';
import { Product } from '../../shared/models/product';
import { User } from '../../shared/models/user';
import { Auction } from '../../shared/models/auction';
import { AuctionRecord } from '../../shared/models/auction-record';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public productDetails: Product[];
  public auctionParticipants: User[];
  public auctionInformation: Auction[];
  public auctionRecords: AuctionRecord[];
  public productId: number;
  public userId: number;
  public auctionId: number;
  public auctionRecordId: number;
  public comments: string;
  public count: number;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private auctionService: AuctionService,
    private auctionRecordService: AuctionRecordService
  ) { }

  ngOnInit() {
    this.productService.getProductById(this.productId).subscribe(dataOfProductId => {
      this.productDetails = dataOfProductId;
    });

    this.userService.getUserById(this.userId).subscribe(dataOfUserId => {
      this.auctionParticipants = dataOfUserId;
    });

    this.auctionService.getAuctionById(this.auctionId).subscribe(dataOfAuctionId => {
      this.auctionInformation = dataOfAuctionId;
    });

    this.auctionRecordService.getAuctionRecordById(this.auctionRecordId).subscribe(dataOfAuctionRecordId => {
      this.auctionRecords = dataOfAuctionRecordId;
    });

    this.count = 0;
  }

  receiveComment($event) {
    this.comments = $event;
    this.count = this.comments.length;
    console.log(this.comments.length);
  }

  recieveCount($event) {
    this.comments = $event;
    this.count = this.comments.length;
  }
}
