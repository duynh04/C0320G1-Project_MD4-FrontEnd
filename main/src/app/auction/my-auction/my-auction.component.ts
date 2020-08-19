import { AuctionRecord } from './../../shared/models/auction-record';
import { AuctionService } from './../../shared/services/auction.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-my-auction',
  templateUrl: './my-auction.component.html',
  styleUrls: ['./my-auction.component.css']
})
export class MyAuctionComponent implements OnInit {

  @ViewChild('focusOn',{static: true}) private elementRef: ElementRef;
  myAuctionRecordList : AuctionRecord[];
  stt: number[];
  bidderId : number = 2;
  productName : string = "";
  recordStatusName : string = "";
  currentProductName : string = "";
  currentRecordStatusName : string = "";
  page : number = 0;
  totalPages : number;
  pageSize : number;

  constructor(private auctionService : AuctionService) { }

  getColor(isWinner : boolean,auctionStatusName : string) : string {
    if (auctionStatusName == "đang đấu giá") {
      return "text-warning";
    } else {
        if (isWinner == true) {
          return "text-success";
        } else {
          return "text-danger";
        }
    }
  }

  getRecordStatusName(isWinner : boolean,auctionStatusName : string) {
    if (auctionStatusName == "đang đấu giá") {
      return "đang đấu giá";
    } else {
        if (isWinner == true) {
          return "đấu giá thành công";
        } else {
          return "đấu giá thất bại";
        }
    }
  }

  previous() {
    if(this.page > 0) {
      this.page = this.page - 1;
      this.getMyAuctionRecords();
    }
  }

  next() {
    if( (this.page + 1) < this.totalPages) {
      this.page = this.page + 1;
      this.getMyAuctionRecords();
    }
  }

  search() {
    this.page = 0;
    this.productName = this.currentProductName.trim();
    this.recordStatusName = this.currentRecordStatusName.trim();
    this.getMyAuctionRecords();
  }

  getMyAuctionRecords() {
    this.auctionService.getMyAuctionRecords(this.bidderId,this.productName,this.recordStatusName,this.page)
    .subscribe(data => {
      if (data != null) {
        this.myAuctionRecordList = data.content;
        this.totalPages = data.totalPages;
        this.pageSize = data.size;
        this.stt = [];
        let firstIndex = this.pageSize*this.page + 1;
        let lastIndeex = this.pageSize*(this.page + 1);
        for (let i = firstIndex; i <= lastIndeex; i++) {
          this.stt.push(i);
        }
      } else {
        this.myAuctionRecordList = [];
        this.totalPages = 0;
        this.page = -1;
      }
      
    })
  }

  ngOnInit() {
    this.elementRef.nativeElement.focus();
    this.getMyAuctionRecords();
  }

}
