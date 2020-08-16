import { Product } from "./product";
import { AuctionRecord } from "./auction-record";
export interface Auction {
  [prop: string]: any;
  // mọi người add thêm prop của đối tượng dưới này,
  // nếu có người add rồi thì xin bỏ qua. xin cảm ơn.
  id: Number;
  product: Product;
  records: AuctionRecord[];
}
