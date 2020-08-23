import { MyAuctionComponent } from './my-auction/my-auction.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserGuard } from '../auth/user.guard';

const routes: Routes = [
  { path: 'product-details/:id', component: ProductDetailsComponent},
  {path : 'myAuction', component : MyAuctionComponent, canActivate: [UserGuard]}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionRoutingModule { }
