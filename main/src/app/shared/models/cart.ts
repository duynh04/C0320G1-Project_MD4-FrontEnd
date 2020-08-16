import {User} from './user';
import {CartDetail} from './cart-detail';

export interface Cart {
  id: number;
  user: User;
  cartDetails: CartDetail[];
  totalPrice: number;
  status: boolean;
}
