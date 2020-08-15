import { AuctionStatus } from './auction-status';
import { Product } from './product';
export interface Auction {
    id: number;
    product: Product;
    auctionStatus: AuctionStatus;
    closeTime: string;
}
