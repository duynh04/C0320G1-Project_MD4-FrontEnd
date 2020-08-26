import { User } from './user';
import { Product } from './product';
export interface CommentLevel1 {
  id: number;
  content: string;
  product: Product;
  images: string;
  user: User;
}
