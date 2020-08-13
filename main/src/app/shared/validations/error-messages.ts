// error validate for delivery address form
export const DELIVERRY_MESSAGES = {
    streetErrors: [
        { code: 'required', message: 'Vui lòng nhập địa chỉ giao hàng' },
        { code: 'maxlength', message: 'Địa chỉ giao hàng không quá 30 kí tự. Chỉ nhập số nhà và tên đường' }
    ],
    phoneNumberErrors: [
        { code: 'required', message: 'Vui lòng nhập số điện thoại giao hàng' },
        { code: 'format', message: 'Số điện thoại không hợp lệ' },
        { code: 'alphabel', message: 'Kí tự không hợp lệ' },
    ],
}
//