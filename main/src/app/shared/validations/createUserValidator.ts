import {Validators} from '@angular/forms';

export  const NOTIFICATION_USER = {
  fullNameErrors: [
    {code: 'required', message: 'vui lòng nhập họ tên'},
    {code: 'pattern', message: 'họ tên không hợp lệ'}
  ],
  genderErrors: [
    {code: 'required', message: 'vui lòng chọn giới tính'}
  ],
  birthdayErrors: [
    {code: 'required', message: 'vui lòng nhập ngày sinh'},
    {code: 'checkBirthday', message: 'ôi bạn ơi!! bạn chưa đủ 18 tuổi'}
  ],
  emailErrors: [
    {code: 'required', message: 'vui lòng nhập địa chỉ email'},
    {code: 'pattern', message: 'email không hợp lệ'},
    {code: 'takenEmail', message: 'Email này đã được đăng kí. vui lòng nhập địa chỉ email khác'}
  ],
  phoneNumberErrors: [
    {code: 'required', message: 'vui lòng nhập số điện thoại'},
    { code: 'format', message: 'Số điện thoại không hợp lệ' },
    { code: 'alphabel', message: 'Kí tự không hợp lệ' },
    {code: 'takenPhone', message: 'SDT này đã được đăng kí. vui lòng nhập sdt khác'}
  ],
  idCardErrors: [
    {code: 'required', message: 'vui lòng cmnd'},
    {code: 'pattern', message: 'cmnd không hợp lệ'}
  ],
  passwordErrors: [
    {code: 'required', message: 'vui lòng nhập mật khẩu'},
    {code: 'pattern', message: 'mật khẩu không hợp lẹ (không chứa ký tự đặc biệt)'},
    {code: 'minlength', message: 'mật khẩu phải lớn hơn 8 ký tự'},
  ],
  confirmPasswordError: [
    {code: 'validPassword', message: 'mật khẩu không trùng khớp'}
  ],
  addressError: [
    {code: 'required', message: 'vui lòng nhập địa chỉ'},
    { code: 'maxlength', message: 'Địa chỉ giao hàng không quá 25 kí tự'},
    {code: 'pattern', message: 'đại chỉ không chứa ký tự đặc biệt'}
  ],
  answerErrors: [
    {code: 'required', message: 'vui lòng chọn câu hỏi bảo mật'}
  ],
  questionErrors: [
    {code: 'required', message: 'vui lòng nhập câu trả lời'}
  ],
  captchaErrors: [
    {code: 'required', message: 'vui lòng nhập mã xác minh'},
    {code: 'pattern', message: 'mã xác minh không đúng'}
  ]
};
