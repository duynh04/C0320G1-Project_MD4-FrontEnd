import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuctionRoutingModule } from './auction-routing.module';
import { MyAuctionComponent } from './my-auction/my-auction.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {CommentBoxComponent} from './comment-box/comment-box.component';
import {ChildBoxComponent} from './child-box/child-box.component';
import {CommentsComponent, DataContainerDirective} from './comments/comments.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReplyContainerDirective } from "./product-details/product-details.component";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";

@NgModule({
  declarations: [ProductDetailsComponent, CommentBoxComponent, ChildBoxComponent, CommentsComponent, DataContainerDirective, ReplyContainerDirective, MyAuctionComponent],
  imports: [
    CommonModule,
    AuctionRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  entryComponents: [ChildBoxComponent]
})
export class AuctionModule { }
