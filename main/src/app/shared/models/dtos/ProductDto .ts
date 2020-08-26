import {ProductImage} from '../product-image';

export class ProductDto  {
  id: number;
  name: string;
  initialPrice: number;
  increaseAmount: number;
  registerDate: string;
  startDate: string;
  endDate: string;
  description: string;
  categoryId: number;
  ownerId: number;
  approvementStatusId: number;
  productImages: [];

  constructor() {
  }
}
