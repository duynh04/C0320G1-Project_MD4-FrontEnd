import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentCenterComponent } from './payment-center/payment-center.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { PaymentOptionComponent } from './payment-option/payment-option.component';
import { OrderStatusComponent } from './order-status/order-status.component';


@NgModule({
  declarations: [PaymentCenterComponent, DeliveryAddressComponent, PaymentOptionComponent, OrderStatusComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
