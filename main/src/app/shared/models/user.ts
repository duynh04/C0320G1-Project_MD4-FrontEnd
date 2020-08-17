import { Rate } from './rate';
export interface User {
    id: number,
    fullname: string,
    email: string,
    phoneNumber:string,
    address: string,
    birthday: string,
    idCard: string,
    gender: string,
    rate: Rate,
    point: number
}
