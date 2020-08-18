import {Category} from './category';
import {User} from './user';
import {ApprovementStatus} from './approvement-status';

// Coder: Nguyen Thanh Tu
export interface Product {
  name: string;
  initialPrice: number;
  increaseAmount: number;
  registerDate: Date;
  startDate: Date;
  endDate: Date;
  description: string;
  category: Category;
  owner: User;
  approvementStatus: ApprovementStatus;
}
