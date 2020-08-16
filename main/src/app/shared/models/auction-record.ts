import { User } from './user';
import { Auction } from './auction';

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
    
}
