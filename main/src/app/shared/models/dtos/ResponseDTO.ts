import {User} from '../user';

export interface ResponseDTO {
  status: string;
  message: string;
  body: User;
}
