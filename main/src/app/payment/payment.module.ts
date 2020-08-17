import { NgModule, LOCALE_ID } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";
import localeVi from "@angular/common/locales/vi";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PaymentRoutingModule } from "./payment-routing.module";
import { PaymentCenterComponent } from "./payment-center/payment-center.component";
import { DeliveryAddressComponent } from "./delivery-address/delivery-address.component";
import { NgxPayPalModule } from "ngx-paypal";
import { PaymentOptionComponent } from "./payment-option/payment-option.component";
import { OrderStatusComponent } from "./order-status/order-status.component";

registerLocaleData(localeVi);
@NgModule({
  declarations: [
    PaymentCenterComponent,
    DeliveryAddressComponent,
    PaymentOptionComponent,
    OrderStatusComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    FormsModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "vi",
    },
  ],
})
export class PaymentModule {}
