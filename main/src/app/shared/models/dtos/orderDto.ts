import { DeliveryAddress } from './../delivery-address';

import { User } from './../user';


//creator: Đặng Hồng Quân team C
export class OrderDto {
  paymentMethod: String;
  deliveryMethod: String;
  paymentState: String;
  buyer: {
    id: number
  };
  deliveryAddress: String;

}
