export interface DeliveryAddressDTO {
    id: number,
    fullname: string,
    email: string,
    phoneNumber: string,
    addresses: UserAddressDTO[]
}
export interface UserAddressDTO {

    id: number;
    nation: string,
    city: string,
    district: string,
    ward: string,
    street: string,
    phoneNumber: string,
    isDefault: boolean,
}

export interface OrderAddressInfo {
    fullName: string,
    city: string,
    district: string,
    ward: string,
    street: string,
    nation: string,
    email: string,
    phoneNumber: string,
    instruction: string,
    isUpdate: boolean
}