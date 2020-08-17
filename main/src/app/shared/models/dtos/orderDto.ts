import { User } from "./../user";
import { DeliveryAddress } from "../delivery-address";

//creator: Đặng Hồng Quân team C
export class OrderDto {
  paymentMethod: String;
  deliveryMethod: String;
  paymentState: String;
  buyer: User;
  deliveryAddress: DeliveryAddress;
}
