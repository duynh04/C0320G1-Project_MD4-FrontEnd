export interface AuctionRecord {
    recordId: number;
    recordAuctionId: number;
    recordBidderId: number;
    recordBidTime: string;
    recordBidPrice: number;
    recordBidIsWinner: boolean;
}
