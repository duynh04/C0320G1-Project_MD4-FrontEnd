import { Rate } from './rate';

export interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: User;
  address: string;
  birthday: string;
  idCard: string;
  gender: string;
  rate: Rate;
  lastLogin: string;
  status: boolean;
}
