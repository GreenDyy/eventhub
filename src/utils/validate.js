export class Validate {
    static Email(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true
        } else {
            return false
        }
    }
    static Password(password) {
        // Kiểm tra độ dài của mật khẩu (ít nhất 8 ký tự)
        if (password.length < 8) {
            return false;
        }

        // Kiểm tra xem mật khẩu có chứa ít nhất một ký tự số
        if (!/\d/.test(password)) {
            return false;
        }

        // Kiểm tra xem mật khẩu có chứa ít nhất một ký tự chữ cái viết thường
        if (!/[a-z]/.test(password)) {
            return false;
        }

        // Kiểm tra xem mật khẩu có chứa ít nhất một ký tự chữ cái viết hoa
        if (!/[A-Z]/.test(password)) {
            return false;
        }

        // Mật khẩu hợp lệ nếu qua tất cả các kiểm tra trên
        return true;
    }
}