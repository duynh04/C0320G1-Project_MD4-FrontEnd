import DateTimeFormat = Intl.DateTimeFormat;

export interface Product {
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
