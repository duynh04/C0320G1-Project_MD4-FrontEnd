export class DealDTO {
  id: number;
  code: string;
  winBiddingTime: string;
  nameSeller: string;
  nameBuyer: string;
  nameProduct: string;
  startingBidPrice: number;
  closingBidPrice: number;
  amount: number;
  totalPayment: number;
  serviceFee: number;
  statusOfDeal: string;
}
