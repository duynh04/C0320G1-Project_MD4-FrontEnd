import { Cart } from "./cart";
import { User } from "./user";

//creator: Đặng Hồng Quân team C
export interface Order {
  [prop: string]: any;
  // mọi người add thêm prop của đối tượng dưới này,
  // nếu có người add rồi thì xin bỏ qua. xin cảm ơn.
  id: number;
  code: string;
  buyer: User;
  status: boolean;
  paymentMethod: string;
  deadlineDelivery: string;
  deliveryAddress: string;
  deliveryMethod: string;
  cart: Cart;
  paymentStatus: string;
}
