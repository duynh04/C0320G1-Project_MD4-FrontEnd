import { Auction } from "./auction";
import { Product } from "./product";
export interface CartDetail {
  [prop: string]: any;
  // mọi người add thêm prop của đối tượng dưới này,
  // nếu có người add rồi thì xin bỏ qua. xin cảm ơn.
  id: Number;
  productQuantity: number;
  auction: Auction;
  productWinPrice: number;
}
