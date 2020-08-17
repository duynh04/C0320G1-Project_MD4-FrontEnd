import { Component, OnInit } from '@angular/core';
import {AuctionTopService} from '../services/auction-top.service';


@Component({
  selector: 'app-auction-top',
  templateUrl: './auction-top.component.html',
  styleUrls: ['./auction-top.component.css']
})
export class AuctionTopComponent implements OnInit {
  public auctionTops;

  constructor(
    public auctionTopService: AuctionTopService
  ) { }

  ngOnInit() {
    this.auctionTopService.getAuctionTop().subscribe(data => {
      this.auctionTops = data;
    });
    this.auctionTopService.getAuctionTop1().subscribe(data1 => {
      this.auctionTops = data1;
    });
    this.auctionTopService.getAuctionTop2().subscribe(data2 => {
      this.auctionTops = data2;
    });
  }

}
