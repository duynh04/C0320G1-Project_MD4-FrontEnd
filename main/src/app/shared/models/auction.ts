import { AuctionStatus } from './auction-status';
import { Product } from './product';
import {AuctionRecord} from "./auction-record";
export interface Auction {
  id: number;
  product: Product;
  auctionStatus: AuctionStatus;
  closeTime: string;
  records: AuctionRecord[];
}
