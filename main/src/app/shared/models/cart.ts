import { CartDetail } from "./cart-detail";
import { User } from "./user";
export interface Cart {
  [prop: string]: any;
  // mọi người add thêm prop của đối tượng dưới này,
  // nếu có người add rồi thì xin bỏ qua. xin cảm ơn.
  id: Number;
  totalPrice: number;
  status: Boolean;
  user: User;
  cartDetails: CartDetail[];
}
