import DateTimeFormat = Intl.DateTimeFormat;

export interface Product {
    id: number;
    productName: string;
    initialPrice: bigint;
    increaseAmount: bigint;
    registerDate: DateTimeFormat;
    startDate: DateTimeFormat;
    endDate: DateTimeFormat;
    approvementStatusId: number;
    productDescription: string;
    productCategoryId: number;
    productOwnerId: number;
}
