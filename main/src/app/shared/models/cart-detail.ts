import {Auction} from './auction';
import {Cart} from './cart';

export interface CartDetail {
  [prop: string]: any;
  id: number;
  cart: Cart;
  auction: Auction;
  productWinPrice: number;
  productQuantity: number;
  cartDetailCost: number;
  status: string;
  isDelete: boolean;
}
