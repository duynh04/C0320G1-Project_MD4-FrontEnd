import {User} from '../user';

export interface ResponseDTO {
  error: any;
  status: string;
  message: string;
  body: User;
}
