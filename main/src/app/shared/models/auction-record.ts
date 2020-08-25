import { User } from "./user";
import { Auction } from "./auction";
export interface AuctionRecord {
    id?: number;
    auction: Auction;
    bidder: {
        id: number
    };
    bidTime: Date;
    bidPrice: number;
    isWinner: boolean;

}
