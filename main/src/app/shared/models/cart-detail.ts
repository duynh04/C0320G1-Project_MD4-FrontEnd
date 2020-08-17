import { Auction } from './auction';
import { Cart } from './cart';

export interface CartDetail {
    id: number,
    cart:Cart,
    productWinPrice:number,
    productQuantity:number,
    status:string,
    auction:Auction,
    isDelete: boolean
}
