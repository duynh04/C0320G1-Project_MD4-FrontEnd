import { MyAuctionComponent } from './my-auction/my-auction.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path : 'myAuction', component : MyAuctionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionRoutingModule { }
