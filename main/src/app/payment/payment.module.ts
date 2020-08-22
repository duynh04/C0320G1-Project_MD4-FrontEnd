import { NgxPayPalModule } from 'ngx-paypal';
import { NgModule, LOCALE_ID } from "@angular/core";
import { CommonModule, registerLocaleData } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import localeVi from "@angular/common/locales/vi";
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentCenterComponent } from './payment-center/payment-center.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { PaymentOptionComponent } from './payment-option/payment-option.component';
import { PaymentInvoiceComponent } from './payment-invoice/payment-invoice.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { NgxBraintreeModule } from 'ngx-braintree';

registerLocaleData(localeVi);
@NgModule({
  declarations: [
    PaymentCenterComponent,
    DeliveryAddressComponent,
    PaymentOptionComponent,
    PaymentInvoiceComponent,
    OrderStatusComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    NgxPayPalModule,
    FormsModule,
    NgxBraintreeModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "vi",
    },
  ],
})
export class PaymentModule { }
