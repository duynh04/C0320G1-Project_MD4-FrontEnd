import {Category} from './category';
import {User} from './user';
import {ApprovementStatus} from './approvement-status';

// Coder: Nguyen Thanh Tu
export class Product {
  public name: string;
  public initalPrice: number;
  public increaseAmount: number;
  public registerDate: Date;
  public startDate: Date;
  public endDate: Date;
  public description: string;
  public categoryId: Category;
  public ownerId: User;
  public approvementStatusId: ApprovementStatus;
  constructor() {
  }
}
