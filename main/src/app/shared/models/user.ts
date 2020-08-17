import { Rate } from './rate';

export interface User {
  id?: number;
  fullname: string;
  email: string;
  phoneNumber: string;
  address: string;
  birthday: string;
  idCard: string;
  gender: string;
  rate?: number;
  point: number;
  lastLogin: string;
  status: boolean;
  deliveryAddressList: string;
  role: string;
  passwordResetCode: string;
  password: string;
  question: string;
  answer: string;
  reasonBan: string;
  isLocked: string;
}
