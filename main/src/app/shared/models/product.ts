import { User } from "./user";
import { Category } from "./category";
import { ApprovementStatus } from "./approvement-status";
import { ProductImage } from "./product-image";

import DateTimeFormat = Intl.DateTimeFormat;

export interface Product {
  // Thành
    id: number;
    name: string;
    initialPrice: bigint;
    increaseAmount: bigint;
    registerDate: DateTimeFormat;
    startDate: DateTimeFormat;
    endDate: DateTimeFormat;
    approvementStatus: {
      id: number,
      name: string
    };
    description: string;
    category: {
      id: number,
      name: string
    };
    owner: number;
  productImageList: [
    {
      link: string;
    }
  ];
}
