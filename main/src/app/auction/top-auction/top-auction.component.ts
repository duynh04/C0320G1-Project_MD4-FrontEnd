// creator: B-Hùng
import { Auction } from './../../shared/models/auction';
import { Component, OnInit } from '@angular/core';
import { AuctionService } from 'src/app/shared/services/auction.service';

@Component({
  selector: 'app-top-auction',
  templateUrl: './top-auction.component.html',
  styleUrls: ['./top-auction.component.css']
})
export class TopAuctionComponent implements OnInit {
  topAuction: Auction[];

  constructor(private aucionService:AuctionService) { }

  ngOnInit() {
    this.aucionService.getTopAuction().subscribe(data=>{
      this.topAuction=data;
      console.log(this.topAuction);
    })
  }

}
