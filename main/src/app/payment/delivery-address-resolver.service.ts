import { Injectable } from '@angular/core';
import { DeliveryAddressDTO } from '../shared/models/dtos/delivery-adddress-dto';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PaymentService } from '../shared/services/payment.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAddressResolverService implements Resolve<DeliveryAddressDTO> {

  constructor(
    private paymentService: PaymentService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DeliveryAddressDTO> | Observable<never> {
    console.log("resolve first")
    return this.paymentService.getAddress();
  }
}
