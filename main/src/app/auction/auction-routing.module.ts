import { TopAuctionComponent } from './top-auction/top-auction.component';
import { MyAuctionComponent } from './my-auction/my-auction.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path : 'myAuction', component : MyAuctionComponent},
  {path: 'topAuction',component:TopAuctionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionRoutingModule { }
