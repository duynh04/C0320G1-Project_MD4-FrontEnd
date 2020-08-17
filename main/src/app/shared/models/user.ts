import { Rate } from "./rate";

export interface User {
  [prop: string]: any;
  // mọi người add thêm prop của đối tượng dưới này,
  // nếu có người add rồi thì xin bỏ qua. xin cảm ơn.
  id: Number;
  fullname: String;
  email: String;
  phoneNumber: String;
  address: String;
  birthday: String;
  idCard: String;
  gender: String;
  rate: Rate;
  lastLogin: String;
  status: boolean;
}
