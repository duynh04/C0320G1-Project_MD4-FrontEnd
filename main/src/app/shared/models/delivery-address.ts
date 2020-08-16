export interface DeliveryAddress {
    [prop: string]: any;
    // mọi người add thêm prop của đối tượng dưới này, 
    // nếu có người add rồi thì xin bỏ qua. xin cảm ơn.
    id: number;
    nation: string,
    city: string,
    district: string,
    ward: string,
    street: string,
    phoneNumber: string,
    isDefault: boolean,
    user: {
        id: number,
    }
}