import { MyAuctionComponent } from './my-auction/my-auction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionRoutingModule } from './auction-routing.module';
import { TopAuctionComponent } from './top-auction/top-auction.component';
import { AuctionPageComponent } from './auction-page/auction-page.component';

import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [AuctionPageComponent,MyAuctionComponent,TopAuctionComponent],
  imports: [
    CommonModule,
    AuctionRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class AuctionModule { }
