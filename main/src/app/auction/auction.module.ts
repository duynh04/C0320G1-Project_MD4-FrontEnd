import { MyAuctionComponent } from './my-auction/my-auction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionRoutingModule } from './auction-routing.module';
import { TopAuctionComponent } from './top-auction/top-auction.component';
import { AuctionPageComponent } from './auction-page/auction-page.component';

import {NgxPaginationModule} from 'ngx-pagination';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {CommentBoxComponent} from './comment-box/comment-box.component';
import {ChildBoxComponent} from './child-box/child-box.component';
import {CommentsComponent, DataContainerDirective} from './comments/comments.component';
import { ReplyContainerDirective } from "./product-details/product-details.component";

@NgModule({
  declarations: [AuctionPageComponent,MyAuctionComponent,TopAuctionComponent,ProductDetailsComponent, CommentBoxComponent, ChildBoxComponent, CommentsComponent, DataContainerDirective, ReplyContainerDirective],
  imports: [
    CommonModule,
    AuctionRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  entryComponents: [ChildBoxComponent]
})
export class AuctionModule { }
