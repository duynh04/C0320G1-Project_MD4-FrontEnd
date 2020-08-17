import { Cart } from './cart';
import { DeliveryAddress } from './delivery-address';
import { User } from './user';
export interface Order {
    id :number,
    code : string,
    buyer: User,
    status: boolean,
    paymentMethod: string,
    deadlineDelivery: string,
    deliveryAddress: DeliveryAddress,
    deliveryMethod: string,
    cart: Cart,
    paymentStatus: string
}
