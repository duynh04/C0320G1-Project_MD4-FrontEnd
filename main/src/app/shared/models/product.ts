import {Category} from './category';
import {User} from './user';
import {ApprovementStatus} from './approvement-status';
import {ProductImage} from './product-image';

// Coder: Nguyen Thanh Tu
export interface Product {
  id: number;
  name: string;
  initialPrice: number;
  increaseAmount: number;
  registerDate: Date;
  startDate: Date;
  endDate: Date;
  approvementStatus: ApprovementStatus;
  description: string;
  category: Category;
  owner: User;
  productImages: string;
}






