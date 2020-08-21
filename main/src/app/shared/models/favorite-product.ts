import {User} from './user';
import {Product} from './product';

export interface FavoriteProduct {
    id: number;
    user: User;
    product: Product;
    status: boolean;
}
