import { AuctionRecord } from './auction-record';
import { AuctionStatus } from './auction-status';
import { Product } from './product';
export interface Auction {
    [prop: string]: any;
    id: number;
    product: Product;
    auctionStatus: AuctionStatus;
    closeTime: string;
}
