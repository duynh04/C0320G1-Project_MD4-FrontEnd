import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { UserService } from '../../shared/services/user.service';
import { AuctionService } from '../../shared/services/auction.service';
import { AuctionRecordService } from '../../shared/services/auction-record.service';
import { Product } from '../../shared/models/product';
import { User } from '../../shared/models/user';
import { Auction } from '../../shared/models/auction';
import { AuctionRecord } from '../../shared/models/auction-record';
import { CommentLevel1Service } from '../../shared/services/comment-level1.service';
import { CommentLevel1 } from '../../shared/models/comment-level1';
import { CommentLevel2Service } from '../../shared/services/comment-level2.service';
import { CommentLevel2 } from '../../shared/models/comment-level2';
import $ from 'jquery';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public productDetails: Product;
  public auctionParticipants: User[];
  public auctionInformation: Auction;
  public auctionRecords: AuctionRecord[] = [];
  public commentLevel1List: CommentLevel1[];
  public commentLevel2List: CommentLevel2[];
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
    private auctionRecordService: AuctionRecordService,
    private commentLevel1Service: CommentLevel1Service,
    private commentLevel2Service: CommentLevel2Service
  ) { }

  ngOnInit() {
    this.productService.getProductById(this.productId).subscribe(dataOfProductId => {
      this.productDetails = dataOfProductId;
      // console.log(this.productDetails);
    });

    this.auctionService.getAuctionByProductId(this.productId).subscribe(dataOfAuctionId => {
      console.log(dataOfAuctionId);
      // this.productDetails = dataOfAuctionId.product;
      this.auctionInformation = dataOfAuctionId;
      // this.auctionRecords = dataOfAuctionId.records;
    });

    this.auctionRecordService.getAllAuctionRecord().subscribe(dataOfAuctionRecord => {
      this.auctionRecords = dataOfAuctionRecord;
    });

    this.count = 0;

    this.commentLevel1Service.getAllCommentLevel1().subscribe(data => {
      this.commentLevel1List = data;
    });

    this.commentLevel2Service.getAllCommentLevel2().subscribe(data => {
      this.commentLevel2List = data;
    });

    $('#change').click(function(){
      $('.select-cities').toggle();
    });

    $(document).ready(function() {
      $("#toggle").click(function() {
        $("#panel").slideToggle("slow");
      });
    });
  }

  receiveComment($event) {
    this.comments = $event;
    this.count = this.commentLevel1List.length;
    console.log(this.comments.length);
  }

  recieveCount($event) {
    this.comments = $event;
    this.count = this.comments.length;
  }
}
