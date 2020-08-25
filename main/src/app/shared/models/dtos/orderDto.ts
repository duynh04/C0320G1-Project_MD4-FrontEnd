


//creator: Đặng Hồng Quân team C
export interface OrderDto {
  paymentMethod: string,
  deliveryMethod: string,
  paymentState: string,
  buyer: {
    id: number
  },
  deliveryAddress: string,
}
