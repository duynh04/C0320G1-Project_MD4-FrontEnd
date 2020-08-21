import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentCenterComponent } from './payment-center/payment-center.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';


@NgModule({
  declarations: [PaymentCenterComponent, DeliveryAddressComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    FormsModule,
  ],
})
export class PaymentModule { }
