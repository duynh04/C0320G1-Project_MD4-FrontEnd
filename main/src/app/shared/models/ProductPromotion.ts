import {Product} from './product';


export class ProductPromotion {
  id: number;
  content: string;
  startDate: Date;
  endDate: Date;
  percent: number;
  price: number;
  idProduct: Product;
}
