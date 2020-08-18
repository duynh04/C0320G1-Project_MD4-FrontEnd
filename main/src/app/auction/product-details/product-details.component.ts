import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { UserService } from '../../shared/services/user.service';
import { AuctionService } from '../../shared/services/auction.service';
import { AuctionRecordService } from '../../shared/services/auction-record.service';
import { Product } from '../../shared/models/product';
import { User } from '../../shared/models/user';
import { Auction } from '../../shared/models/auction';
import { AuctionRecord } from '../../shared/models/auction-record';
declare var $: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public productDetails: Product;
  public auctionParticipants: User[];
  public auctionInformation: Auction;
  public auctionRecords: AuctionRecord[];
  public productId = 1;
  public userId = 1;
  public auctionId = 1;
  public auctionRecordId = 1;
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
      console.log(this.productDetails);
    });

    this.userService.getUserById(this.userId).subscribe(dataOfUserId => {
      this.auctionParticipants = dataOfUserId;
    });

    this.auctionService.getAuctionByProductId(1).subscribe(dataOfAuctionId => {
      console.log(dataOfAuctionId);
      this.productDetails = dataOfAuctionId.product;
      this.auctionInformation = dataOfAuctionId;
    });

    this.auctionRecordService.getAllAuctionRecord().subscribe(dataOfAuctionRecord => {
      this.auctionRecords = dataOfAuctionRecord;
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
