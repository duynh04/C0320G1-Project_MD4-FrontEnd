import { User } from "./../user";
import { DeliveryAddress } from "../delivery-address";
export class OrderDto {
  paymentMethod: String;
  deliveryMethod: String;
  paymentState: String;
  buyer: User;
  deliveryAddress: DeliveryAddress;
}
