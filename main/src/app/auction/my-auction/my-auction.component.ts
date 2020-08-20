import { AuctionRecord } from './../../shared/models/auction-record';
import { AuctionService } from './../../shared/services/auction.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-my-auction',
  templateUrl: './my-auction.component.html',
  styleUrls: ['./my-auction.component.css']
})
export class MyAuctionComponent implements OnInit {

  @ViewChild('focusOn',{static: true}) private elementRef: ElementRef;
  myAuctionRecordList : Observable<AuctionRecord[]>;
  stt: number[];
  bidderId : number = 2;
  productName : string = "";
  recordStatusName : string = "";
  currentProductName : string = "";
  currentRecordStatusName : string = "";
  currentPage : number;
  pageSize : number;
  totalElements : number;
  isEmpty : boolean = false;

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

  getPage(pageNumber: number) {
    this.myAuctionRecordList = this.auctionService.getMyAuctionRecords(this.bidderId,this.productName,this.recordStatusName,pageNumber - 1).pipe(
      tap(res => {
        this.totalElements = res.totalElements;
        this.pageSize = res.size;
        this.currentPage = pageNumber;

        this.stt = [];
        let firstIndex = this.pageSize*(this.currentPage - 1) + 1;
        let lastIndeex = this.pageSize*this.currentPage;
        for (let i = firstIndex; i <= lastIndeex; i++) {
          this.stt.push(i);
        }

        this.isEmpty = false;
        if (res.content.length == 0) {
          this.isEmpty = true;
        }
      }),
      map(res => res.content)
    );
  }

  search() {
    this.productName = this.currentProductName.trim();
    this.recordStatusName = this.currentRecordStatusName.trim();
    this.getPage(1);
  }

  ngOnInit() {
    this.elementRef.nativeElement.focus();
    this.getPage(1);
  }

}
