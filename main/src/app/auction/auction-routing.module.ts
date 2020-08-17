import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CommentBoxComponent } from './comment-box/comment-box.component';
import { ChildBoxComponent } from './child-box/child-box.component';
import { CommentsComponent } from './comments/comments.component';
import { DataContainerDirective } from './comments/comments.component';


const routes: Routes = [
  { path: 'product-details/:id', component: ProductDetailsComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
  declarations: [ProductDetailsComponent, CommentBoxComponent, ChildBoxComponent, CommentsComponent, DataContainerDirective]
})
export class AuctionRoutingModule { }
