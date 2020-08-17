import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AuctionRoutingModule } from './auction-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuctionRoutingModule,
    HttpClientModule,
    BrowserModule
  ]
})
export class AuctionModule { }
