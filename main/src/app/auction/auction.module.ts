import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionRoutingModule } from './auction-routing.module';
import { MyAuctionComponent } from './my-auction/my-auction.component';


@NgModule({
  declarations: [MyAuctionComponent],
  imports: [
    CommonModule,
    AuctionRoutingModule,
    FormsModule
  ]
})
export class AuctionModule { }
