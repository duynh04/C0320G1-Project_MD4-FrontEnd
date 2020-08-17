import { User } from './user';
export interface Cart {
    id: number,
    totalPrice: number,
    status: boolean
    user: User
}
