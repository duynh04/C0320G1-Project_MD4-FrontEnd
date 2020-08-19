import { Cart } from "./cart";
import { User } from "./user";

//creator: Đặng Hồng Quân team C
export interface Order {
  [prop: string]: any;
  // mọi người add thêm prop của đối tượng dưới này,
  // nếu có người add rồi thì xin bỏ qua. xin cảm ơn.
  id: number;
  code: String;
  buyer: User;
  status: boolean;
  paymentMethod: String;
  deadlineDelivery: String;
  deliveryAddress: String;
  deliveryMethod: String;
  cart: Cart;
  paymentStatus: String;
}
