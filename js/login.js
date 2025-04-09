const users = [
    { email: "phatnguyen@gmail.com", password: "12345678" },
    { email: "john.doe@example.com", password: "John@1234" },
    { email: "user@gmail.com", password: "12345678" },
    { email: "mark.nguyen@example.com", password: "Mark@2024" },
    { email: "sara.lee@example.com", password: "SaraLee_99" },
    { email: "tom.bui@example.com", password: "TomBui@88" }
];

document.addEventListener("DOMContentLoaded", () => {
    // Nếu đã đăng nhập rồi, tự động chuyển sang home.html
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        window.location.href = "home.html";
        return;
    }

    let buttonSignIn = document.querySelector(".login-button-js");

    buttonSignIn.addEventListener("click", () => {
        let emailValue = document.getElementById("email-sign-in").value.trim();
        let passwordValue = document.getElementById("password-sign-in").value;

        if (
            emailValue === "" ||
            !emailValue.includes("@") ||
            !(emailValue.endsWith(".com") || emailValue.endsWith(".vn"))
        ) {
            // demo dùng alert
            alert("Email không hợp lệ, vui lòng thử lại! (demo nên tạm dùng alert)");
            return;
        }

        if (passwordValue.length < 8) {
            alert("Mật khẩu không hợp lệ! (demo nên tạm dùng alert)");
            return;
        }

        const matchedUser = users.find(
            (user) => user.email === emailValue && user.password === passwordValue
        );

        if (matchedUser) {
            // Lưu thông tin người dùng hiện tại
            localStorage.setItem("currentUser", JSON.stringify({ email: emailValue }));
            window.location.href = "home.html";
        } else {
            alert("Tài khoản hoặc mật khẩu không đúng! (demo nên tạm dùng alert)");
        }
    });
});
