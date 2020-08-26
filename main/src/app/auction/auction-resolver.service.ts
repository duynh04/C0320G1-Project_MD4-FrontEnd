import { Injectable } from '@angular/core';
import { DeliveryAddressDTO } from '../shared/models/dtos/delivery-adddress-dto';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, of} from 'rxjs';
import { PaymentService } from '../shared/services/payment.service';
import {AuctionService} from '../shared/services/auction.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionResolverService implements Resolve<number> {

  constructor(
    private auctionService: AuctionService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> | Observable<never> {
    console.log("resolve first");
    let auctionId;
    route.params.subscribe(data => auctionId = data.id);
    return of(auctionId);
  }
}
