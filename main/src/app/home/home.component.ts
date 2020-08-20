import { Auction } from './../shared/models/auction';
import { ProductService } from './../shared/services/product.service';
import { printPdf } from 'src/assets/javascript/generate-pdf';
import { Product } from './../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../shared/services/auction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  auctionList: Auction[];
  constructor(private auctionService: AuctionService) { }

  ngOnInit() {
     this.auctionService.getAllAuctions().subscribe(data=> {
       this.auctionList=data;
       console.log(this.auctionList);
      })
     
  }

}
