import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuctionRoutingModule } from './auction-routing.module';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {CommentBoxComponent} from './comment-box/comment-box.component';
import {ChildBoxComponent} from './child-box/child-box.component';
import {CommentsComponent, DataContainerDirective} from './comments/comments.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ProductDetailsComponent, CommentBoxComponent, ChildBoxComponent, CommentsComponent, DataContainerDirective],
  imports: [
    CommonModule,
    AuctionRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class AuctionModule { }
