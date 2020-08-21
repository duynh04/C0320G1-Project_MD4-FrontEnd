import { MyAuctionComponent } from './my-auction/my-auction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionRoutingModule } from './auction-routing.module';
import { AuctionPageComponent } from './auction-page/auction-page.component';


@NgModule({
  declarations: [AuctionPageComponent,MyAuctionComponent],
  imports: [
    CommonModule,
    AuctionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuctionModule { }
