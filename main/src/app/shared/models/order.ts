import { Cart } from './cart';
import { DeliveryAddress } from './delivery-address';
import { User } from './user';

export interface Order {
  [prop: string]: any;
  // mọi người add thêm prop của đối tượng dưới này,
  // nếu có người add rồi thì xin bỏ qua. xin cảm ơn.
  id: number;
  // tslint:disable-next-line:ban-types
  code: String;
  buyer: User;
  status: boolean;
  paymentMethod: String;
  deadlineDelivery: String;
  deliveryAddress: DeliveryAddress;
  deliveryMethod: String;
  cart: Cart;
  paymentStatus: String;
}
