import {Auction} from './auction';
import {Cart} from './cart';

export interface CartDetail {
  id: number;
  cart: Cart;
  auction: Auction;
  productWinPrice: number;
  productQuantity: number;
  cartDetailCost: number;
  status: string;
  isDelete: boolean;
}
