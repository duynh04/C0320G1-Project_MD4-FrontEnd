// error validate for delivery address form
export const DELIVERRY_MESSAGES = {
  cityErrors: [
    { code: 'required', message: 'Vui lòng chọn Tỉnh/Thành phố' }
  ],
  districtErrors: [
    { code: 'required', message: 'Vui lòng chọn Quận/Huyện' }
  ],
  wardErrors: [
    { code: 'required', message: 'Vui lòng chọn Phường/Xã' }
  ],
  streetErrors: [
    { code: 'required', message: 'Vui lòng nhập địa chỉ giao hàng' },
    { code: 'maxlength', message: 'Địa chỉ giao hàng không quá 30 kí tự. Chỉ nhập số nhà và tên đường' }
  ],
  phoneNumberErrors: [
    { code: 'required', message: 'Vui lòng nhập số điện thoại giao hàng' },
    { code: 'format', message: 'Số điện thoại không hợp lệ. Số điện thoại bao gồm 10 kí tự số' },
    { code: 'alphabel', message: 'Kí tự không hợp lệ. Vui lòng nhập kí tự số' },
  ]
};
export const PRODUCT_MESSAGES = {
  // Thành
  dateStartErrors: [
    { code: 'required', message: 'Vui lòng chọn ngày đấu giá' }
  ],
  productNameErrors: [
    { code: 'required', message: 'Vui lòng nhập tên sản phẩm' },
    { code: 'pattern', message: 'Vui lòng bắt đầu bằng chữ hoa chữ cái đầu tiên và không nhập ký tự đặc biệt' }
  ],
  initialPriceErrors: [
    { code: 'required', message: 'Vui lòng nhập giá khởi điểm' },
    { code: 'min', message: 'Vui lòng nhập giá là số nguyên dương' }
  ],
  increaseAmountErrors: [
    { code: 'required', message: 'Vui lòng chọn bước giá' },
    { code: 'min', message: 'Vui lòng nhập bước giá là số nguyên dương' }
  ],
  endDateErrors: [
    { code: 'required', message: 'Vui lòng chọn ngày kết thúc đấu giá' },
    { code: 'date', message: 'Vui lòng chọn ngày kết thúc đấu giá sau ngày bắt đầu đấu giá' }
  ],
  descriptionErros: [
    { code: 'required', message: 'Vui lòng nhập mô tả sản phẩm' },
    { code: 'maxlength', message: 'Mô tả sản phẩm không quá 250 kí tự. Vui lòng nhập lại' }
  ],
  categoryIdErrors: [
    { code: 'required', message: 'Vui lòng chọn loại sản phẩm' }
  ]
};
//
