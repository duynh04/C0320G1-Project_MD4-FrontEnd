import { User } from "./user";

export interface DeliveryAddress {
  [prop: string]: any;
  // mọi người add thêm prop của đối tượng dưới này,
  // nếu có người add rồi thì xin bỏ qua. xin cảm ơn.
  id: Number;
  city: string;
  district: string;
  ward: string;
  street: string;
  nation: string;
  phoneNumber: string;
  isDefault: Boolean;
  user: User;
}
