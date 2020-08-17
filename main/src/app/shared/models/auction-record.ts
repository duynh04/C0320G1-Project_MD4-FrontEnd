import { User } from "./user";
import { Auction } from "./auction";
export interface AuctionRecord {
  [prop: string]: any;
  id: number;
  auction: Auction;
  bidder: User;
  bidTime: string;
  bidPrice: number;
  isWinner: boolean;
}
