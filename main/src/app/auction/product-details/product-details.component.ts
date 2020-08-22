import { Component, OnInit, OnChanges, EventEmitter,
  Directive, ViewContainerRef, ViewChildren, QueryList, ComponentFactoryResolver } from '@angular/core';
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
import { ProductCommentDto } from "../../shared/models/dtos/product-comment-dto";
import { ChildBoxComponent } from "../child-box/child-box.component";
import $ from 'jquery';
import {element} from "protractor";

@Directive({
  selector: '[ReplyContainer]'
})
export class ReplyContainerDirective {
  constructor(
    public viewContainerRef: ViewContainerRef
  ) {
  }
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnChanges {
  public productDetails: Product;
  public auctionParticipants: User[];
  public auctionInformation: Auction;
  public auctionRecords: AuctionRecord[] = [];
  public commentLevel1List: CommentLevel1[];
  public commentLevel2List: CommentLevel2[];
  public commentLv1List: ProductCommentDto[];
  public productId = 1;
  public userId = 1;
  public auctionId = 1;
  public auctionRecordId = 1;
  public commentLevel1Id = 1;
  public commentProductId = 1;
  public comments: string;
  public count: number;
  public loadReplyComponent = false;
  public reply: Array<object> = [];

  @ViewChildren(ReplyContainerDirective) entry: QueryList<ReplyContainerDirective>;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private auctionService: AuctionService,
    private auctionRecordService: AuctionRecordService,
    private commentLevel1Service: CommentLevel1Service,
    private commentLevel2Service: CommentLevel2Service,
    private resolve: ComponentFactoryResolver
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

    this.commentLevel1Service.getCommentLevel1ByProductId(this.commentProductId).subscribe(data => {
      this.commentLv1List = data;
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

  ngOnChanges() {
    if (this.commentLv1List != undefined) {
      console.log('Main array====>', this.commentLv1List);
    }
  }

  replyComments(index) {
    this.loadReplyComponent = true;
    const myFactory = this.resolve.resolveComponentFactory(ChildBoxComponent);
    if (this.entry.toArray()[index].viewContainerRef.length <= 0) {
      const myRef = this.entry.toArray()[index].viewContainerRef.createComponent(myFactory);
      myRef.instance.commentNo = index;
      myRef.changeDetectorRef.detectChanges();
      myRef.instance.userReplyComment.subscribe(data => {
        this.receiveReplyComment(data, index);
      });
      myRef.instance.deleteNo.subscribe(no => {
        myRef.destroy();
      });
    }
  }

  receiveReplyComment($event, i) {
    this.reply = $event;
    this.commentLv1List.forEach((element) => {
      if (element.id === i) {
        element.commentLevel2List.push(...$event);
      }
    });
    this.loadReplyComponent = false;
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
