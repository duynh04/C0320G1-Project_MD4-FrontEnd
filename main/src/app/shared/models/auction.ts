<<<<<<< HEAD
import { AuctionRecord } from './auction-record';
import { AuctionStatus } from './auction-status';
import { Product } from './product';
export interface Auction {
    [prop: string]: any;
    // mọi người add thêm prop của đối tượng dưới này, 
    // nếu có người add rồi thì xin bỏ qua. xin cảm ơn.
    id : number;
    product : Product;
    auctionStatus : AuctionStatus;
    closeTime : Date;
    records : AuctionRecord[];
=======
import { AuctionStatus } from './auction-status';
import { Product } from './product';
export interface Auction {
    id: number;
    product: Product;
    auctionStatus: AuctionStatus;
    closeTime: string;
>>>>>>> d597fe82fdf19a58650d37a2d2d4dba19780e289
}
