import { AuctionPageComponent } from './auction-page/auction-page.component';
import { MyAuctionComponent } from './my-auction/my-auction.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: ":id", component: AuctionPageComponent},
  {path : 'myAuction', component : MyAuctionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionRoutingModule { }
