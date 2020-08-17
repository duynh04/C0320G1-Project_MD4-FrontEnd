import { User } from './user';
import { Category } from './category';
import { ApprovementStatus } from './approvement-status';
export interface Product {
   id: number;
   name: string;
   initialPrice: number;
   increaseAmount: number;
   registerDate: string;
   startDate: string;
   endDate: string;
   approvementStatus: ApprovementStatus;
   description: string;
   category: Category;
   owner: User;

}
