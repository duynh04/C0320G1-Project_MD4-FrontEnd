<<<<<<< HEAD
import { User } from './user';
import { Category } from './category';
import { ApprovementStatus } from './approvement-status';
export interface Product {
    [prop: string]: any;
    // mọi người add thêm prop của đối tượng dưới này, 
    // nếu có người add rồi thì xin bỏ qua. xin cảm ơn.
    id : number;
    name : string;
    initialPrice : number;
    increaseAmount : number;
    registerDate : Date;
    startDate : Date;
    endDate : Date;
    approvementStatus : ApprovementStatus;
    description : string;
    category : Category;
    owner : User;
}   
=======
import {User} from './user';
import {Category} from './category';
import {ApprovementStatus} from './approvement-status';
import {ProductImage} from './product-image';

export interface Product {
  id: number;
  name: string;
  initialPrice: number;
  increasingAmount: number;
  registerDate: string;
  startDate: string;
  endDate: string;
  approvementStatus: ApprovementStatus;
  description: string;
  category: Category;
  owner: User;
  productImages: ProductImage[];
}
>>>>>>> d597fe82fdf19a58650d37a2d2d4dba19780e289
