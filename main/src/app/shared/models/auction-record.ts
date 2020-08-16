import { User } from './user';
import { Auction } from './auction';
<<<<<<< HEAD

export interface AuctionRecord {
    [prop: string]: any;
    // mọi người add thêm prop của đối tượng dưới này, 
    // nếu có người add rồi thì xin bỏ qua. xin cảm ơn.
    id : number;
    auction : Auction;
    bidder : User;
    bidTime : Date;
    bidPrice : number;
    isWinner : boolean;
    
=======
export interface AuctionRecord {
    id: number;
    auction: Auction;
    bidder: User;
    bidTime: string;
    bidPrice: number;
    isWinner: boolean;

>>>>>>> d597fe82fdf19a58650d37a2d2d4dba19780e289
}
