import { Validators } from '@angular/forms';

export const NOTIFICATION_USER = {
  fullNameErrors: [
    { code: 'required', message: 'Vui lòng nhập họ tên' },
    { code: 'pattern', message: 'Họ tên không hợp lệ' }
  ],
  genderErrors: [
    { code: 'required', message: 'Vui lòng chọn giới tính' }
  ],
  birthdayErrors: [
    { code: 'required', message: 'Vui lòng nhập ngày sinh' },
    { code: 'checkBirthday', message: 'Hê thống chỉ đăng ký vói thành viên trên 18 tuổi' }
  ],
  emailErrors: [
    { code: 'required', message: 'Vui lòng nhập địa chỉ email' },
    { code: 'pattern', message: 'Email không hợp lệ' },
    { code: 'takenEmail', message: 'Email này đã được đăng kí. vui lòng nhập địa chỉ email khác' }
  ],
  phoneNumberErrors: [
    { code: 'required', message: 'Vui lòng nhập số điện thoại' },
    { code: 'format', message: 'Số điện thoại không hợp lệ' },
    { code: 'alphabel', message: 'Kí tự không hợp lệ' },
    { code: 'takenPhone', message: 'SDT này đã được đăng kí. vui lòng nhập sdt khác' }
  ],
  idCardErrors: [
    { code: 'required', message: 'Vui lòng cmnd' },
    { code: 'pattern', message: 'Cmnd không hợp lệ' }
  ],
  passwordErrors: [
    { code: 'required', message: 'Vui lòng nhập mật khẩu' },
    { code: 'pattern', message: 'Mật khẩu không hợp lẹ (không chứa ký tự đặc biệt)' },
    { code: 'minlength', message: 'Mật khẩu phải lớn hơn 8 ký tự' },
  ],
  confirmPasswordError: [
    { code: 'validPassword', message: 'Mật khẩu không trùng khớp' }
  ],
  addressError: [
    { code: 'required', message: 'vui lòng nhập địa chỉ' },
    { code: 'maxlength', message: 'Địa chỉ giao hàng không quá 25 kí tự' },
    { code: 'pattern', message: 'Đại chỉ không chứa ký tự đặc biệt' }
  ],
  answerErrors: [
    { code: 'required', message: 'Vui lòng chọn câu hỏi bảo mật' }
  ],
  questionErrors: [
    { code: 'required', message: 'Vui lòng nhập câu trả lời' }
  ],
  captchaErrors: [
    { code: 'required', message: 'Vui lòng nhập mã xác minh' },
    { code: 'pattern', message: 'Mã xác minh không đúng' }
  ]
};
