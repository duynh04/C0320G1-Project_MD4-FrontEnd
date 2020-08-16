import { ProductImage } from "./product-image";
export interface Product {
  [prop: string]: any;
  // mọi người add thêm prop của đối tượng dưới này,
  // nếu có người add rồi thì xin bỏ qua. xin cảm ơn.
  id: Number;
  name: String;
  productImages: ProductImage;
}
