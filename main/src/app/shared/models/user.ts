import { Rate } from './rate';
export interface User {
<<<<<<< HEAD
    [prop: string]: any;
    // mọi người add thêm prop của đối tượng dưới này, 
    // nếu có người add rồi thì xin bỏ qua. xin cảm ơn.
    id : number;
    fullname : string;
    email : string;
    phoneNumber : string;
    address : string;
    birthday : Date;
    idCard : string;
    gender : string;
    rate : Rate;
    point : number;
    lastLogin : Date;
    status : boolean;
=======
    id: number;
    fullname: string;
    email: string;
    phoneNumber: string;
    address: string;
    birthday: string;
    idCard: string;
    gender: string;
    rate: Rate;
    point: number;
    lastLogin: string;
    status: boolean
>>>>>>> d597fe82fdf19a58650d37a2d2d4dba19780e289
}
