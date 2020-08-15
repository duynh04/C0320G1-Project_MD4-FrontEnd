export interface DeliveryAddress {
    [prop: string]: any;
    // mọi người add thêm prop của đối tượng dưới này, 
    // nếu có người add rồi thì xin bỏ qua. xin cảm ơn.
    firstName: string,
    lastName: string,
    city: string,
    district: string,
    ward: string,
    street: string,
    nation: string,
    email: string,
    phoneNumber: string,
    instruction: string
}